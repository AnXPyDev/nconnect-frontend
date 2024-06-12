export default class LocalStorage {

    static set(name: string, value?: any): void {
        if (value === undefined) {
            localStorage.removeItem(name);
            return;
        }

        localStorage.setItem(name, JSON.stringify(value));
    }

    static get(name: string): any | undefined {
        const stored = localStorage.getItem(name);
        if (stored === null) {
            return;
        }

        return JSON.parse(stored);
    }
}

