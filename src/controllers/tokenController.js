import { genRefreshToken } from "../services/tokenService.js";

export async function tokenController(req,res){
    try {
        const {refreshToken} = req.body;
        if(!refreshToken) return res.status(400).send({ message: 'Refresh token missing' });
        const accessToken = await genRefreshToken(refreshToken)
        return res.status(200).send({accessToken})
    } catch (error) {
        console.error("Error in Token Generation ",error.message ?? error);
        return res.status(401).send({message : error.message ?? error})
    }
}