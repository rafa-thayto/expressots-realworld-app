import { UserRepository } from './user.repository'
import { PrismaClient } from '@prisma/client'
import prismaMock from '../../../client'
import

const mockedPrismaClient = mocked
describe('[UserRepository]', () => {
  let repository: UserRepository

  beforeEach(() => {
    repository = new UserRepository()
  })

  it('create user', () => {
    const user = {
      id: 1,
      name: 'Rich',
      email: 'hello@prisma.io',
      acceptTermsAndConditions: true,
    }

    prismaMock.user.create.mockResolvedValue(user)

    await expect(createUser(user)).resolves.toEqual({
      id: 1,
      name: 'Rich',
      email: 'hello@prisma.io',
      acceptTermsAndConditions: true,
    })
  })
})
