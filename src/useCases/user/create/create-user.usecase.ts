import { AppError, Report, StatusCode } from '@expressots/core'
import { provide } from 'inversify-binding-decorators'
import {
    ICreateUserRequestDTO,
    ICreateUserResponseDTO,
} from './create-user.dto'
import { UserRepository } from '@repositories/user/user.repository'
import { User } from '@entities/user.entity'

@provide(CreateUserUseCase)
class CreateUserUseCase {
    constructor(private userRepository: UserRepository) { }

    execute(data: ICreateUserRequestDTO): ICreateUserResponseDTO | null {
        try {
            // const { name, email } = data;

            //
            // const user: User | null = this.userRepository.create(
            //     new User(name, email),
            // );

            const user: User | null = null

            if (!user) {
                Report.Error(
                    new AppError(
                        StatusCode.BadRequest,
                        'User already exists',
                        'create-user-usecase',
                    ),
                )
            }

            let response: ICreateUserResponseDTO

            if (user !== null) {
                response = {
                    status: 'success',
                }
                return response
            }

            return null
        } catch (error: any) {
            console.error(`[CreateUserUseCase] Error message: ${error}`)
            throw error
        }
    }
}

export { CreateUserUseCase }
