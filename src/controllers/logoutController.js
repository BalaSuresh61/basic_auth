import { logout } from "../services/logoutService.js";


export async function logoutController(req,res){
    try {
        const user = req.user;
        if(!user) return res.status(400).send({message: "User not found"});
        await logout(user);
        return res.status(200).send({message: "User logout successfully"})
    } catch (error) {
        console.log("Error in Logout ", error.message ?? error);
        return res.status(401).send({message : error.message ?? error});
    }

}