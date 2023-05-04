import { prismaClient } from '@providers/prisma/prisma.provider'
import { provide } from 'inversify-binding-decorators'
import { IBaseRepository } from '../base-repository.interface'
import { User } from '@entities/index'

@provide(UserRepository)
class UserRepository implements IBaseRepository<User> {
  async create(item: User): Promise<User> {
    const createdUser = await prismaClient().user.create({
      data: {
        username: item.username,
        password: item.password,
        email: item.email,
      },
    })

    return createdUser as User
  }

  update(item: User) {
    return item
  }

  delete(id: string): boolean {
    return false
  }

  find(id: string): User | null {
    return new User()
  }

  findAll(): User[] {
    return [new User(), new User()]
  }
}

export { UserRepository }
