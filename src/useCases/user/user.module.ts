import { CreateModule } from '@expressots/core'
import { CreateUserController } from './create/create-user.controller'
import { GetCurrentUserController } from './get-current/get-current-user.controller'

const UserModule = CreateModule([CreateUserController, GetCurrentUserController])

export { UserModule }
