/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from 'inversify'
import { IBaseRepository } from './base-repository.interface'

@injectable()
export abstract class BaseRepository<T> implements IBaseRepository<T> {
  create(item: T): Promise<T | null> {
    throw new Error('Method not implemented.')
  }
  update(item: T): Promise<T | null> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  findById(id: string): Promise<T | null> {
    throw new Error('Method not implemented.')
  }
  findAll(): T[] | Promise<T[]> {
    throw new Error('Method not implemented.')
  }
}
