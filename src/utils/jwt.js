import jwt from 'jsonwebtoken'
export async function verifyToken(token, secret){
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Error in Token verify ",error.message?? error)
        throw new Error(error.message ?? error);
    }
}

export async function createJWT(payload, secret, expire){
    try {
        const {id, email, role} = payload;

        const token = jwt.sign(
            {userId: id,
            email: email,
            role: role },
            secret,
            {expiresIn: expire})

        return token
    } catch (error) {
        console.error('Error While Generating JWT Token ', error.message?? error);
        throw new Error(error.message ?? error);    
    }
}