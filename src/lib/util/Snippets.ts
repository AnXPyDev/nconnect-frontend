export function predicateByID<T extends { id?: number }>(id: number) {
    return (v: T) => v.id === id;
}