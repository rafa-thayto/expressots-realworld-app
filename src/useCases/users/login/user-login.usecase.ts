import { StatusCode } from '@expressots/core'
import { UserRepository } from '@repositories/user/user.repository'
import { genJwtToken } from '@shared/auth/jwt'
import { provide } from 'inversify-binding-decorators'
import { UserLoginRequestDTO, UserLoginResponseDTO } from './user-login.dto'

@provide(UserLoginUseCase)
class UserLoginUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(data: UserLoginRequestDTO): Promise<UserLoginResponseDTO> {
        const unauthorizedResponse: UserLoginResponseDTO = {
            status: StatusCode.Unauthorized,
            error: {
                body: [],
            },
        }

        const user = await this.userRepository.findByEmail(data.user.email)

        if (!user) {
            return unauthorizedResponse
        }

        const token = await genJwtToken(user, data.user.password)

        if (!token) {
            return unauthorizedResponse
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...userWithoutId } = user

        return {
            status: StatusCode.OK,
            user: {
                ...userWithoutId,
                token,
            },
        } as UserLoginResponseDTO
    }
}

export { UserLoginUseCase }
