import { AppUseCase } from '@application/use-cases/app.usecase'
import { BaseController } from '@expressots/core'
import { controller, httpGet, response } from 'inversify-express-utils'

@controller('/health')
class HealthController extends BaseController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(private _: AppUseCase) {
    super('health-controller')
  }

  @httpGet('/')
  execute(@response() res: any) {
    return res.send('alive')
  }
}

export { HealthController }
