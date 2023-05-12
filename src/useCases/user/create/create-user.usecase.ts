import { StatusCode } from '@expressots/core'
import { provide } from 'inversify-binding-decorators'
import { CreateUserRequestDTO, CreateUserResponseDTO } from './create-user.dto'
import { UserRepository } from '@repositories/user/user.repository'
import { genSaltSync, hashSync } from 'bcrypt'
import { Prisma, User } from '@prisma/client'

@provide(CreateUserUseCase)
class CreateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
        try {
            const salt = genSaltSync(10)
            const hashedPassword = hashSync(data.user.password, salt)

            await this.userRepository.create({
                image: null,
                bio: null,
                email: data.user.email,
                password: hashedPassword,
                username: data.user.username,
            } as User)

            const response: CreateUserResponseDTO = {
                status: StatusCode.OK,
            }
            return response
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                const meta = error.meta
                const response: CreateUserResponseDTO = {
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

export { CreateUserUseCase }
