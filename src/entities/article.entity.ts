import { provide } from 'inversify-binding-decorators'
import { Tag } from './tag.entity'
import { User } from './user.entity'

@provide(Article)
export class Article {
  public id: number
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
