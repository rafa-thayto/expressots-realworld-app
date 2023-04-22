import { BaseController } from '@expressots/core'
import { controller, httpGet, response } from 'inversify-express-utils'

@controller('/health')
class HealthController extends BaseController {
  constructor() {
    super('health-controller')
  }

  @httpGet('/')
  execute(@response() res: any) {
    return res.send('alive')
  }
}

export { HealthController }
