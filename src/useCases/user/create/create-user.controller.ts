import { BaseController, StatusCode } from '@expressots/core'
import {
  controller,
  httpPost,
  requestBody,
  response,
} from 'inversify-express-utils'
import { CreateUserRequestDTO, CreateUserResponseDTO } from './create-user.dto'
import { CreateUserUseCase } from './create-user.usecase'

@controller('/users')
class CreateUserController extends BaseController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super('create-user-controller')
  }

  @httpPost('/')
  execute(
    @requestBody() data: CreateUserRequestDTO,
    @response() res: any,
  ): Promise<CreateUserResponseDTO> {
    return this.callUseCaseAsync(
      this.createUserUseCase.execute(data),
      res,
      StatusCode.Created,
    )
  }
}

export { CreateUserController }
