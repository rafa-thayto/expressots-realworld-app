import { CreateModule } from '@expressots/core'
import { AppController } from '@application/controllers/app.controller'
import { HealthController } from '@application/controllers/health.controller'

const AppModule = CreateModule([AppController, HealthController])

export { AppModule }
