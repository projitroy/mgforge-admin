import jwt, { Secret } from "jsonwebtoken";

interface UserPayload {
  mobile: string;
  password: string;
}

const rawSecret = process.env.JWT_SECRET;
if (!rawSecret) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

const secretRaw: Secret = rawSecret;
const secretBase64: Secret | null = (() => {
  try {
    const buffer = Buffer.from(rawSecret, "base64");
    return buffer.length > 0 ? buffer : null;
  } catch {
    return null;
  }
})();

function getVerificationSecrets(): Secret[] {
  const secrets: Secret[] = [secretRaw];
  if (secretBase64) secrets.push(secretBase64);
  return secrets;
}

export function generateJWTToken(mobile: string, password: string): string {
  const payload: UserPayload = {
    mobile,
    password,
  };

  const options = {
    expiresIn: "1d",
    algorithm: "HS256",
  } as const;

  const signingSecret = process.env.JWT_SECRET_IS_BASE64 ? secretBase64 ?? secretRaw : secretRaw;
  return jwt.sign(payload, signingSecret, options);
}

export function verifyToken(token: string) {
  const secrets = getVerificationSecrets();

  for (const secret of secrets) {
    try {
      return jwt.verify(token, secret, { algorithms: ["HS256"] });
    } catch (err: any) {
      console.warn("JWT verification attempt failed for one secret format:", err.message);
    }
  }

  console.error("JWT verification failed for all known secret formats.");
  return null;
}
