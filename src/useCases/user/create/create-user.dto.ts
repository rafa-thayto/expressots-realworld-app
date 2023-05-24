import { User } from '@entities/user.entity'
import type { AppError } from '@shared/types/app-error'

interface CreateUserRequestDTO {
  user: Pick<User, 'email' | 'username' | 'password'>
}

type CreateUserResponseDTO =
  | {
    status: number
  }
  | ({
    status: number
  } & AppError<{ meta?: Record<string, unknown> }>)

export { CreateUserRequestDTO, CreateUserResponseDTO }
