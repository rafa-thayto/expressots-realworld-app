import { injectable } from 'inversify'
import { provide } from 'inversify-binding-decorators'

@provide(User)
@injectable()
export class User {
  public token: string
  public email: string
  public username: string
  public bio: string
  public image: string
}
