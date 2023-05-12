import { StatusCode } from '@expressots/core'
import { User } from '@prisma/client'
import { UserRepository } from '@repositories/user/user.repository'
import { compare } from 'bcrypt'
import { provide } from 'inversify-binding-decorators'
import { UserLoginRequestDTO, UserLoginResponseDTO } from './user-login.dto'
import jwt from 'jsonwebtoken'
import env from 'env'

@provide(UserLoginUseCase)
class UserLoginUseCase {
    constructor(private userRepository: UserRepository) { }

    async verifyUserAuth(user: User, password: string): Promise<string | null> {
        try {
            if (await compare(password, user.password)) {
                const token = jwt.sign(
                    { id: user.id, email: user.email, type: 'user' },
                    env.Application.JWT_SECRET,
                    { expiresIn: '2h' },
                )
                return token
            }

            return null
        } catch (error) {
            return null
        }
    }

    async execute(data: UserLoginRequestDTO): Promise<UserLoginResponseDTO> {
        const unauthorizedResponse: UserLoginResponseDTO = {
            status: StatusCode.Unauthorized,
            error: {
                body: []
            }
        }

        const user = await this.userRepository.findByEmail(data.user.email)

        if (!user) {
            return unauthorizedResponse
        }

        const token = await this.verifyUserAuth(user, data.user.password)

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
