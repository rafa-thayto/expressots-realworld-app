import 'reflect-metadata'

import { App } from '@infra/providers/application'
import { ServerEnvironment } from '@expressots/core'
import { container } from '@infra/containers/app-container'

export async function bootstrap() {
  const app = App.create(container)
  app.listen(5000, ServerEnvironment.Development)
}

bootstrap()
