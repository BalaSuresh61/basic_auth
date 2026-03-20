import { dashboard } from "../services/dashboardService.js";

export async function dashboardController(req,res){
    try {
        const body = req.body;
        const header = req.headers;

        const token = header.authorization?.split(' ')[1];
        if(!token) return res.status(400).send({message: "Token is missing"});
        await dashboard(body, header, token);
        return res.status(200).send({message: `Welcome to the dashboard`});
    } catch (error) {
        console.log("Error in Dashboard ",error.message?? error)
        return res.status(400).send({message: error.message ?? error});
    }

}