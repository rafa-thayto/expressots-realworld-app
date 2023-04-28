import { PrismaClient } from '@prisma/client'
import { provide } from 'inversify-binding-decorators'

@provide(PrismaProvider)
class PrismaProvider {
  private static instance: PrismaClient

  public static getInstance(): PrismaClient {
    if (!PrismaProvider.instance) {
      PrismaProvider.instance = new PrismaClient()
    }

    return PrismaProvider.instance
  }
}

const prismaClient = PrismaProvider.getInstance

export { PrismaProvider, prismaClient }
