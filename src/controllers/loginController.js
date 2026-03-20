import {loginService, setTokenInDB} from '../services/loginService.js'
import { createJWT } from '../utils/jwt.js'

export async function login(req,res){
    try {
        const{email,password}= req.body;
        const resp = await loginService(email, password);
        if(resp === false){
            console.warn("Invalid Password");
            return res.status(401).send({message : "Invalid Password"});
        }
        const accessToken = await createJWT(resp, process.env.JWT_ACCESS_SECRET, process.env.ACCESS_EXPIRY);
        const refreshToken = await createJWT(resp, process.env.JWT_REFRESH_SECRET, process.env.REFRESH_EXPIRY);
        await setTokenInDB(refreshToken, email);
        return res.status(200).send({message : "Login Successful", accessToken, refreshToken});
    } catch (error) {
        const err = error.message ?? error.message.include('User not found') ? error.message : 'Unknown error';
        console.error(`Error in LoginController ${err}`);
        return res.status(400).send({message: err});
    }
    
}