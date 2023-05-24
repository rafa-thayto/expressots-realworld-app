import { StatusCode } from '@expressots/core'
import { provide } from 'inversify-binding-decorators'
import { GetCurrentUserResponseDTO } from './get-current-user.dto'
import { UserRepository } from '@repositories/user/user.repository'
import { Prisma } from '@prisma/client'
import { verifyJwtToken } from '@shared/auth/jwt'
import {
  JsonWebTokenError,
  TokenExpiredError,
  VerifyErrors,
} from 'jsonwebtoken'

@provide(GetCurrentUserUseCase)
class GetCurrentUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(token?: string): Promise<GetCurrentUserResponseDTO> {
    try {
      const decoded = await verifyJwtToken(token)

      if (!decoded) {
        const response: GetCurrentUserResponseDTO = {
          status: StatusCode.Unauthorized,
          error: {
            body: [],
          },
        }

        return response
      }

      const user = await this.userRepository.findByEmail(decoded.email)

      const response: GetCurrentUserResponseDTO = {
        user,
        status: StatusCode.OK,
      }
      return response
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        console.log('deu bomJsonWebTokenError??????', error)
      }
      if (error instanceof TokenExpiredError) {
        const response: GetCurrentUserResponseDTO = {
          status: StatusCode.Unauthorized,
          error: {
            body: [],
          },
        }

        return response
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const meta = error.meta
        const response: GetCurrentUserResponseDTO = {
          status: StatusCode.UnprocessableEntity,
          error: {
            body: [{ meta }],
          },
        }

        return response
      }

      console.error(`[CreateUserUseCase] Error message: ${error}`)
      throw error
    }
  }
}

export { GetCurrentUserUseCase }
