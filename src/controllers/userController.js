import { getUserDetails, updateUserService, validateUser } from "../services/userService.js";


export async function getUser(req, res){
    try {
        const {userId} = req.user;
        const user = await getUserDetails(userId);
        return res.status(200).send({user});
    } catch (error) {
        console.error(error.message ?? error);
        return res.status(401).send({message: error.message ?? error})
    }
}

export async function updateUser(req,res){
    try {
        const payload = req.body;
        const user = req.user;
        const {email} = payload;
        if(email) return res.status(401).send({message: "Email can't be updated"});

        const valid = await validateUser(payload);
        if(valid != true) return res.status(401).send({message: valid});
        const updateDB = await updateUserService(payload,user.userId);
        return res.status(200).send(updateDB);
    } catch (error) {
        console.error("Error in Update User ", error.message ?? error);
        return res.status(401).send({message: error.message ?? error})
    }

}