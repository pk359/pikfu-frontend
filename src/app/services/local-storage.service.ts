import { Injectable } from '@angular/core';

type TLocalStorageKeys =
    'JWT_TOKEN';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService implements Storage {
    private storage: Storage;

    constructor() {
        this.storage = localStorage;
    }

    [name: string]: any;

    length = 0;

    clear(): void {
        this.storage.clear();
    }

    getItem(key: TLocalStorageKeys): string | null {
        return this.storage.getItem(key);
    }

    key(index: number): string | null {
        return this.storage.key(index);
    }

    removeItem(key: TLocalStorageKeys): void {
        return this.storage.removeItem(key);
    }

    setItem(key: TLocalStorageKeys, value: string): void {
        return this.storage.setItem(key, value);
    }
}
