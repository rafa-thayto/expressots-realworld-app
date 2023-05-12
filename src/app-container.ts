import { AppContainer } from '@expressots/core'
import { AppModule } from '@useCases/app/app.module'
import { PingModule } from '@useCases/ping/ping.module'
import { UserModule } from '@useCases/user/user.module'
import { UsersModule } from '@useCases/users/users.module'

const appContainer = new AppContainer()

const container = appContainer.create([
    // Add your modules here
    AppModule,
    PingModule,
    UserModule,
    UsersModule,
])

export { container }
