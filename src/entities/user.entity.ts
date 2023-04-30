import { provide } from 'inversify-binding-decorators'

@provide(User)
export class User {
  public token?: string
  public email: string
  public username: string
  public password: string
  public bio?: string
  public image?: string
}
