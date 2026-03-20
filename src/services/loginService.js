import db from '../config/db.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function loginService(email, password){
    try {
        const result = await db.query('SELECT id, email, password, role from users WHERE email = $1',[email])
        if(result?.rows?.length === 0 ){
            throw new Error('User Not Found');
        }
        const hashedPassword = result?.rows[0].password;
        const passMatch = await bcrypt.compare(password,hashedPassword);
        if(passMatch){
            return result.rows[0];
        }
        return false;
    } catch (error) {
        console.error("Error in Password Comparing ",error.message ?? error);
        throw new Error(error.message ?? error);
    }
}

export async function setTokenInDB(refreshToken, email){
    const hashToken = await bcrypt.hash(refreshToken, 10);
    await db.query('UPDATE users SET refresh_token = $1 WHERE email = $2',[hashToken, email]);
}