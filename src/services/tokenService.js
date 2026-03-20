import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import db from '../config/db.js'
import { createJWT} from '../utils/jwt.js'

export async function genRefreshToken(refreshToken){
    try {
        const decode =  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        if (!decode || !decode.email) {
            throw new Error('Invalid refresh token payload');
        }
        const result = await db.query('SELECT id, role, email, refresh_token FROM USERS WHERE email = $1',[decode.email]);
        const user = result?.rows[0]
        if(!user) throw new Error("Invalid Token");
        const verify = await bcrypt.compare(refreshToken, user.refresh_token);
        if(!verify) throw new Error("Invalid Token")
        const accessToken = await createJWT(user, process.env.JWT_ACCESS_SECRET, process.env.ACCESS_EXPIRY);
        return accessToken;
    } catch (error) {
        console.error("Error in Token Generation ",error.message ?? 'Failed to generate access token');
        throw new Error(error.message ?? 'Failed to generate access token');
    }
}