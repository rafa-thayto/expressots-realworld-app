import { User } from '@prisma/client'
import { AppError } from '@shared/types/app-error'

interface UserLoginRequestDTO {
  user: Pick<User, 'email' | 'password'>
}

type UserLoginResponseDTO =
  | {
    user: Omit<User, 'id'>
    status: number
  }
  | ({
    status: number
  } & AppError<{ meta?: Record<string, unknown> }>)

export { UserLoginRequestDTO, UserLoginResponseDTO }
