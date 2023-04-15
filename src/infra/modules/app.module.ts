import { CreateModule } from '@expressots/core'
import { AppController } from '@application/controllers/app.controller'

const AppModule = CreateModule([AppController])

export { AppModule }
