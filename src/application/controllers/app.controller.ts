import { BaseController } from '@expressots/core'
import { controller, httpGet, response } from 'inversify-express-utils'
import { AppUseCase } from '@application/use-cases/app.usecase'

@controller('/')
class AppController extends BaseController {
  constructor(private appUseCase: AppUseCase) {
    super('app-controller')
  }

  @httpGet('/')
  execute(@response() res: any) {
    return res.send(this.appUseCase.execute())
  }
}

export { AppController }
