import ApiCodes from "./Codes";

type Callback = () => Promise<any>;

type HandlerResult = Promise<any> | any;

export type GenericResponse<T = {}, C extends ApiCodes = ApiCodes> = {
    code: C
} & T;

export type Response<T = {}> = GenericResponse<T, ApiCodes.Ok>;

export type FailResponse<T = {}, C extends ApiCodes = ApiCodes> = {
    code: C
    message?: string
} & T;

type Handler<T extends GenericResponse> = (response: T) => HandlerResult;
type FailHandler<T extends FailResponse> =  Handler<T>;
type ExceptionHandler = (exception: unknown) => HandlerResult;

type GenericHandler = Handler<GenericResponse>;
type GenericFailHandler = FailHandler<FailResponse>;


export class ResponseHandler {
    handlers: Map<ApiCodes, GenericHandler> = new Map();
    nonzeroHandler?: GenericFailHandler;
    anyHandler?: GenericHandler;

    async handle<T extends GenericResponse>(response: T) {
        if (response.code === undefined) {
            response.code = ApiCodes.Ok;
        }

        const code = response.code;

        if (!(code in ApiCodes)) {
            console.warn(`Result code ${code} not in ApiCodes`);
        }

        let handler = this.handlers.get(code);

        if (!handler) {
            if (code != ApiCodes.Ok && this.nonzeroHandler) {
                handler = this.nonzeroHandler;
            } else if (this.anyHandler) {
                handler = this.anyHandler;
            } else if (code == ApiCodes.Ok) {
                return response;
            } else {
                throw new RequestFailedError(response);
            }
        }

        return await handler!!(response);
    }
    
    then<R extends Response>(handler: Handler<R>) {
        return this.code(ApiCodes.Ok, handler);
    }

    any<R extends GenericResponse>(handler: Handler<R>) {
        this.anyHandler = handler as GenericHandler;
        return this;
    }

    fail<R extends FailResponse>(handler: FailHandler<R>) {
        this.nonzeroHandler = handler as GenericFailHandler;
        return this;
    }

    code<T, C extends ApiCodes>(code: C, handler: Handler<GenericResponse<T, C>>) {
        this.handlers.set(code, handler as GenericHandler);
        return this;
    }
}

export class RequestFailedError<R extends FailResponse> extends Error {
    response: R;

    constructor(response: R) {
        super(response.message);
        this.response = response;
    }
}

export default class RequestBuilder {
    callback!: Callback;
    name?: string;
    responseHandler: ResponseHandler = new ResponseHandler();
    exceptionHandler?: ExceptionHandler;


    constructor(callback: Callback, name?: string) {
        this.callback = callback;
        this.name = name;
    }

    then<R extends Response>(handler: Handler<R>) {
        this.code(ApiCodes.Ok, handler);
        return this;
    }

    any<R extends GenericResponse>(handler: Handler<R>) {
        this.responseHandler.any(handler);
        return this;
    }

    fail<R extends FailResponse>(handler: FailHandler<R>) {
        this.responseHandler.fail(handler);
        return this;
    }

    failMessage(message: string = `Request ${this.name ?? "?"} failed`) {
        return this.fail((res) => {
            console.error(`${message}: ${res.code} => ${res.message}`);
        });
    }
    
    code<T, C extends ApiCodes>(code: C, handler: Handler<GenericResponse<T, C>>) {
        this.responseHandler.code(code, handler);
        return this;
    }

    catch(handler: ExceptionHandler = (e) => {console.error(e)}) {
        this.exceptionHandler = handler;
        return this;
    }

    unwrap() {
        return this;
    }

    async send(): Promise<any> {
        try {
            const response = await this.callback();
            return await this.responseHandler.handle(response);
        } catch (e) {
            if (e instanceof RequestFailedError || !this.exceptionHandler) {
                throw e;
            }

            return await this.exceptionHandler(e);
        }
    }
}