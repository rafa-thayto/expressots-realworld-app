import { AppContainer } from '@expressots/core'
import { AppModule } from '@infra/modules/app.module'

const appContainer = new AppContainer()

const container = appContainer.create([
  // Add your modules here
  AppModule,
])

export { container }
