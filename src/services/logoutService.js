import db from '../config/db.js';

export async function logout(user){
    try {
        const result = await db.query('UPDATE users SET refresh_token = $1 WHERE id = $2 ',[null, user.userId]);
        return result;
    } catch (error) {
        throw new Error(error.message ?? error);
    }
}