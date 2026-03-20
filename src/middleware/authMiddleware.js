import { verifyToken } from "../utils/jwt.js";

export async function authMiddleware(req,res,next){
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if(!token) return res.status(400).send({message: "Token is missing"});
        const user = await verifyToken(token, process.env.JWT_ACCESS_SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in Middleware ",error.message?? error)
        return res.status(400).send({message: error.message ?? error});
    }
}