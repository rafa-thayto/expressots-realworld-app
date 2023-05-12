import { User } from '@prisma/client'
import { prismaClient } from '@providers/prisma/prisma.provider'
import { BaseRepository } from '@repositories/base-repository'
import { provide } from 'inversify-binding-decorators'

@provide(UserRepository)
class UserRepository extends BaseRepository<User> {
  async create(item: User): Promise<User> {
    const createdUser = await prismaClient().user.create({
      data: {
        username: item.username,
        password: item.password,
        email: item.email,
      },
    })

    return createdUser
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prismaClient().user.findUnique({
      where: {
        email,
      },
    })

    console.log('user', user)

    return user
  }
}

export { UserRepository }
