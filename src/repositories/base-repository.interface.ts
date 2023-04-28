interface IBaseRepository<T> {
    create(item: T): Promise<T> | T | null
    update(item: T): Promise<T> | T | null
    delete(id: string): boolean
    find(id: string): Promise<T> | T | null
    findAll(): Promise<T[]> | T[]
}

export { IBaseRepository }
