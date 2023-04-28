import { provide } from 'inversify-binding-decorators'

@provide(Tag)
export class Tag {
  public id: number
  public name: string
}
