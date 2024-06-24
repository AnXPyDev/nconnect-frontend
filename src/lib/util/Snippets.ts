import { ref, toRaw, watch, type ModelRef, type Ref } from "vue";
import type { GenericModel, ID, WithID } from "../remote/Models";

export type Nullable<T> = T | null;

export function predicateByID<T extends GenericModel>(id: ID) {
    return (v: T) => v.id === id;
}

export function ensureObjects<T>(...keys: (keyof T)[]) {
    return (v: any) => {
        for (const key of keys) {
            const x = v[key];
            if (x == undefined || (x instanceof Array && x.length == 0)) {
                v[key] = {};
            }
        }
        return v as T;
    }
}

export function notnull(val: any): boolean {
    return val != null;
}

export function replaceEntity<T extends GenericModel>(arr: Ref<T[]>, entity: WithID<T>) {
    const index = arr.value.findIndex(predicateByID(entity.id));
    if (index === -1) {
        return;
    }
    console.log(arr.value[index], entity);
    Object.assign(arr.value[index], entity);
}

export function deleteEntity<T extends GenericModel>(arr: Ref<T[]>, id: ID) {
    const index = arr.value.findIndex(predicateByID(id));
    if (index === -1) {
        return;
    }

    arr.value.splice(index, 1);
}

export function withEntity<T extends GenericModel>(arr: Ref<T[]>, id: ID, callback: (entity: T) => void) {
    const entity = arr.value.find(predicateByID(id));
    if (entity) {
        callback(entity);
    }
}

export function pushEntity<T extends GenericModel>(arr: Ref<T[]>, entity: T) {
    arr.value.push(entity);
}

export function copyEntityRef<T>(ref: Ref<T>) {
    return structuredClone(toRaw(ref.value));
}

export function copyEntity<T>(entity: T) {
    return structuredClone(toRaw(entity));
}

export function stringOrNull(s: string): Nullable<string> {
    if (s.length == 0) {
        return null;
    }

    return s;
}

export function nullableStringModel(model: ModelRef<Nullable<string>>): Ref<string> {
    const r = ref<string>(model.value ?? "");
    watch(r, (s) => {
        model.value = stringOrNull(s);
    });

    return r;
}