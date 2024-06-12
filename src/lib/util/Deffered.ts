export default class Deffered<T> {
    promise: Promise<T>;

    resolver!: (value: any) => void;
    rejector!: (reason: any) => void; 

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this.resolver = resolve;
            this.rejector = reject;
        });

        while (this.resolver === undefined && this.rejector === undefined) {
            console.log("waiting");
        }
    }

    resolve(result: T) {
        this.resolver(result);
    }

    reject(reason: any) {
        this.rejector(reason);
    }

}