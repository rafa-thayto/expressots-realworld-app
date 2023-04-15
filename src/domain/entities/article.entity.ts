import { injectable } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { Tag } from './tag.entity'
import { User } from './user.entity'

@provide(Article)
@injectable()
export class Article {
  public slug: string
  public title: string
  public description: string
  public body: string
  public tagList: Tag[]
  public createdAt: Date
  public author: User
  public favorited: boolean
  public favoritesCount: number
}
