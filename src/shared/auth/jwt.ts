import { compare } from "bcrypt"
import jwt from 'jsonwebtoken'
import env from 'env'
import { User } from "@prisma/client"

type JwtToken = {
  id: string
  email: string;
  type: string
}

export const genJwtToken = async (user: User, password: string): Promise<string | null> => {
  try {
    if (await compare(password, user.password)) {
      console.log('env.Application', env.Application)

      const token = jwt.sign(
        { id: user.id, email: user.email, type: 'user' },
        env.Application.JWT_SECRET,
        { expiresIn: '2h' },
      )
      return token
    }

    return null
  } catch (error) {
    return null
  }
}

type VerifyJwtToken = (token?: string) => Promise<JwtToken | null>

export const verifyJwtToken: VerifyJwtToken = async (bearerToken?: string) => {
  if (!bearerToken)
    return null

  let token: string;

  const parts = bearerToken.split(' ');

  if (parts.length !== 2) {
    return null
  }

  if (parts.length === 2) {
    const scheme = parts[0];
    const credentials = parts[1];

    if (/^Bearer$/i.test(scheme)) {
      token = credentials;
    } else {
      return null
    }
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, env.Application.JWT_SECRET, (err, decoded) => {
      if (err) {
        return reject(err)
      }

      if (decoded instanceof String || !decoded) {
        return {}
      }

      return resolve(decoded as JwtToken)
    })
  })
}
