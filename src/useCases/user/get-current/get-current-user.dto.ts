import { User } from '@prisma/client'
import type { AppError } from '@shared/types/app-error'

type GetCurrentUserResponseDTO =
    | {
        user: Omit<User, 'password'> | null
        status: number
    }
    | ({
        status: number
    } & AppError<{ meta?: Record<string, unknown> }>)

export { GetCurrentUserResponseDTO }
