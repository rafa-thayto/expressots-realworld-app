import { CreateModule } from '@expressots/core'
import { UserLoginController } from './login/user-login.controller'

const UsersModule = CreateModule([UserLoginController])

export { UsersModule }
