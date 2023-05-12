interface IBaseRepository<T> {
    create(item: T): Promise<T | null>
    update(item: T): Promise<T | null>
    delete(id: string): Promise<boolean>
    findById(id: string): Promise<T | null>
    findAll(): Promise<T[]> | T[]
}

export { IBaseRepository }
