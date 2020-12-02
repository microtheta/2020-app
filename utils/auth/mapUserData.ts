import { stringify } from "querystring"

export type UserType = {
  id: String
  email: String
  token: String
}

export const mapUserData = (user) => {
  const { uid, email, xa, ya } = user
  return {
    id: uid,
    email,
    token: xa || ya,
  } as UserType
}
