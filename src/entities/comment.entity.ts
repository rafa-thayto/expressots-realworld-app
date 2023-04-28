import { provide } from 'inversify-binding-decorators'
import { User } from './user.entity'

@provide(Comment)
export class Comment {
  public id: number
  public createdAt: Date
  public updatedAt: Date
  public body: string
  public author: User
}
