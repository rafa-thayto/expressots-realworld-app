import { AppError, Report, StatusCode } from '@expressots/core'
import { provide } from 'inversify-binding-decorators'
import { CreateUserRequestDTO, CreateUserResponseDTO } from './create-user.dto'
import { UserRepository } from '@repositories/user/user.repository'
// import { User } from '@entities/user.entity'
import { genSaltSync, hashSync } from 'bcrypt'
import { Prisma } from '@prisma/client'

@provide(CreateUserUseCase)
class CreateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
        try {
            const salt = genSaltSync(10)
            const hashedPassword = hashSync(data.user.password, salt)

            await this.userRepository.create({
                email: data.user.email,
                password: hashedPassword,
                username: data.user.username,
            })

            console.log('||||||||||||||||||||||||||||||||||')

            // const user: User | null = null
            //
            // if (!user) {
            //     Report.Error(
            //         new AppError(
            //             StatusCode.BadRequest,
            //             'User already exists',
            //             'create-user-usecase',
            //         ),
            //     )
            // }

            const response: CreateUserResponseDTO = {
                status: StatusCode.OK,
            }
            return response
        } catch (error) {
            console.log(
                'error',
                error instanceof Prisma.PrismaClientKnownRequestError,
            )
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Report.Error(
                //     new AppError(
                //         StatusCode.UnprocessableEntity,
                //         'User already exists',
                //         'create-user-usecase',
                //     ),
                // )

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
