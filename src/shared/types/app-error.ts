import { Prisma } from '@prisma/client'

export type AppError<T = Prisma.PrismaClientKnownRequestError> = {
  error: {
    body: T[]
  }
}
