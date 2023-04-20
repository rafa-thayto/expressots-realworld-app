import 'reflect-metadata'

import { AppInstance, ServerEnvironment } from '@expressots/core'
import { container } from '@infra/containers/app-container'

export async function bootstrap() {
  const app = AppInstance.create(container)
  app.listen(5000, ServerEnvironment.Development)
}

bootstrap()
