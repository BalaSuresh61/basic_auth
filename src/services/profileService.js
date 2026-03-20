import db from '../config/db.js'

export async function Profile(filepath, id){
    try {
        await db.query('UPDATE users SET profile = $1 WHERE id = $2',[filepath, id])
    } catch (error) {
        throw new Error(error.message ?? error);
    }
}