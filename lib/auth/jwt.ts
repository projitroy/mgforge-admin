import jwt from 'jsonwebtoken';

export function generateJWTToken(mobile: String, password: String) {
    const payload = {
        mobile,
        password
    };

    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1d', // Token expires in 1 day
    };

    return jwt.sign(payload, secret, options);

}

export function verifyToken(token: String) {
    const secret = process.env.JWT_SECRET;
    try {
        const decodedPayload = jwt.verify(token, secret);
        return decodedPayload;
    } catch (err: any) {
        console.error('JWT verification failed:', err.message);
        return null;
    }
}