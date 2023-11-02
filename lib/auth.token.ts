import { Secret, sign, verify, JwtPayload } from 'jsonwebtoken'

export const createAccessToken = (
  id: string,
  email: string,
  role?: string
): string => {
  const expiresIn = '2d' // 48 hours
  return sign(
    { id: id, email: email, role: role },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: expiresIn,
    }
  )
}

export interface AccessTokenPayload extends JwtPayload {
  id: string
  email: string
  role?: string
}
export function verifyAccessToken(
  token: string,
  secret: Secret
): AccessTokenPayload {
  try {
    const payload = verify(token, secret) as AccessTokenPayload
    return payload
  } catch (error: any) {
    throw new Error('Token Invalid or expired access token')
  }
}
