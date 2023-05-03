import 'reflect-metadata'

jest.mock('@prisma/client', () => {
  const original = jest.requireActual('@prisma/client')

  return {
    ...original,
    PrismaClient: jest.fn(),
  }
})
