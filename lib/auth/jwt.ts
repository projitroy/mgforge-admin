import jwt, { Secret } from "jsonwebtoken";

interface UserPayload {
  mobile: string;
  password: string;
}

const secret: Secret = process.env.JWT_SECRET!;

if (!secret) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export function generateJWTToken(mobile: string, password: string): string {

  const payload: UserPayload = {
    mobile,
    password,
  };

  const options = {
    expiresIn: "1d",
    algorithm: 'HS256'
  } as const;

  return jwt.sign(payload, secret, options);
}

export function verifyToken(token: string) {
  try {
    const decodedPayload = jwt.verify(token, secret);
    return decodedPayload;
  } catch (err: any) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
}
