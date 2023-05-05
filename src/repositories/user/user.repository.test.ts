import { UserRepository } from './user.repository'
import { User } from '@entities/index'
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const mockedPrismaClient = jest.mocked(PrismaClient)

describe('[UserRepository]', () => {
  let repository: UserRepository

  beforeEach(() => {
    repository = new UserRepository()
  })

  describe('Create User', () => {
    const user: User = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    mockedPrismaClient.mockReturnValueOnce({
      user: {
        create: jest
          .fn()
          .mockResolvedValueOnce(user)
          .mockRejectedValue(new Error()),
      },
    } as any)

    it('with success', async () => {
      await expect(repository.create(user)).resolves.toEqual(user)
    })

    it('with error', async () => {
      await expect(repository.create(user)).rejects.toEqual(new Error())
    })
  })
})
