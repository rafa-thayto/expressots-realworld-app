import { injectable } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { User } from './user.entity'

@provide(Comment)
@injectable()
export class Comment {
  public id: string
  public createdAt: Date
  public updatedAt: Date
  public body: string
  public author: User
}
