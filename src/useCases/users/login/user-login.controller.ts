import { BaseController, StatusCode } from '@expressots/core'
import {
  controller,
  httpPost,
  requestBody,
  response,
} from 'inversify-express-utils'
import { UserLoginUseCase } from './user-login.usecase'
import { UserLoginRequestDTO, UserLoginResponseDTO } from './user-login.dto'

@controller('/users/login')
class UserLoginController extends BaseController {
  constructor(private userLoginUseCase: UserLoginUseCase) {
    super('user-login-controller')
  }

  @httpPost('/')
  execute(
    @requestBody() data: UserLoginRequestDTO,
    @response() res: any,
  ): Promise<UserLoginResponseDTO> {
    return this.callUseCaseAsync(
      this.userLoginUseCase.execute(data),
      res,
      StatusCode.OK,
    )
  }
}

export { UserLoginController }
