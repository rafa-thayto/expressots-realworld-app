import { injectable } from 'inversify'
import { provide } from 'inversify-binding-decorators'

@provide(Tag)
@injectable()
export class Tag {
  public id: string
  public name: string
}
