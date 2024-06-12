import Deffered from "@/lib/util/Deffered";

export type ServiceRequest = any;
export type ServiceResult = any;
export type ServiceFeeder = () => Promise<DefferedServiceRequest>;

export interface DefferedServiceRequest {
    request: ServiceRequest
    resolve: (result: ServiceResult) => void
    reject: (reason: any) => void
}

export interface ServiceHandler {
    registerFeed(feed: ServiceFeeder): void;
}

class Service {
    handler: ServiceHandler;
    queue: DefferedServiceRequest[] = [];
    waiter?: Deffered<DefferedServiceRequest>;

    constructor(handler: ServiceHandler) {
        this.handler = handler;
        handler.registerFeed(() => this.feedRequest());
    }

    async feedRequest(): Promise<DefferedServiceRequest> {
        let request = this.queue.shift();
        if (request === undefined) {
            this.waiter = new Deffered();
            request = await this.waiter.promise;
            this.waiter = undefined;
        }
        return request!!;
    }

    request(request: ServiceRequest): Promise<ServiceResult> {
        return new Promise((resolve, reject) => {
            const dsr = { request, resolve, reject };
            if (this.waiter) {
                this.waiter.resolve(dsr);
            } else {
                this.queue.push(dsr);
            }
        });
    }
}

class ServiceManager {
    services: { [name: string]: Service } = {};

    registerService(name: string, handler: ServiceHandler) {
        this.services[name] = new Service(handler);
    }

    getService(name: string): Service | undefined {
        return this.services[name];
    }
}

const services = new ServiceManager();

export default services;