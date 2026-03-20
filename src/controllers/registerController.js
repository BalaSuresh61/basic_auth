import {registerUserService, validateUser} from '../services/userService.js'

export async function registerUser(req,res){
    try {
        const payload = req.body;
        if(!payload.name || !payload.email || !payload.password ){
            return res.status(401).send({message: !payload.name? 'User Name is missing' 
                : !payload.email ? 'User email is missing' 
                :  'User password is missing'})
        }
        console.log('Log from Register User');
        const valid = validateUser(payload);
        if(valid !== true){
            return res.status(401).send({message:valid})
        }

        const resp = await registerUserService(payload)
        return res.status(200).send({message:resp})
        
    } catch (error) {
        console.error(error.message ?? error)
        return res.status(500).send({Error: `${error.message ?? error}`})
    }
}

export function registerAdmin(req,res){
    const payload = req.body;
    console.log('Log from Register Admin');
    return res.status(200).send({message:"Admin Created"})
}
