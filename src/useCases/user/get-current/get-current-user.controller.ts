import { BaseController, StatusCode } from '@expressots/core'
import {
  controller,
  httpGet,
  requestHeaders,
  response,
} from 'inversify-express-utils'
import { GetCurrentUserResponseDTO } from './get-current-user.dto'
import { GetCurrentUserUseCase } from './get-current-user.usecase'

@controller('/user')
class GetCurrentUserController extends BaseController {
  constructor(private getCurrentUserUseCase: GetCurrentUserUseCase) {
    super('get-current-user-controller')
  }

  @httpGet('/')
  execute(
    @requestHeaders() headers: any,
    @response() res: any,
    salve,
  ): Promise<GetCurrentUserResponseDTO> {
    return this.callUseCaseAsync(
      this.getCurrentUserUseCase.execute(headers?.authorization),
      res,
      StatusCode.OK,
    )
  }
}

export { GetCurrentUserController }
