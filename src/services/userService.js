import db from '../config/db.js';
import bcrypt from 'bcrypt';
import validator from 'validator';

export function validateUser(payload){
    try {
        const {email,phone,dob='' } = payload;
        if(email && !validator.isEmail(email)) return "Invalid Email";
        if(phone && !validator.isMobilePhone(phone,'en-IN')) return "Invalid Phone Number";
        if(dob && !validator.isDate(dob,("DD-MM-YYYY"))) return "Invalid Date Format in DOB";

        return true;
        
    } catch (error) {
        console.error("Error in validation: ",error.message ?? error);
        throw new Error(error.message ?? error)
    }
}

export async function registerUserService(payload){
    try {
        const {name,email,password, phone='', dob=''}= payload;
        let userRegister = await db.query('SELECT email FROM users WHERE email = $1',[email]);
        if(userRegister.rows.length >= 1){
            return "User Already Register";
        }
        const hashed = await bcrypt.hash(password,10);
        const res = await db.query('INSERT INTO users (name, email, password, role, phone, dob) VALUES($1, $2, $3, $4, $5, $6)',[name, email, hashed, 'user', phone, dob]);
        return "User Register Successfully";
    } catch (error) {
        const err = JSON.stringify(error.message ?? error);
        console.error(`Error in Register User ${err}`)
        throw new Error(err.includes("invalid")? "Invalid input":"Error in User Register");
    }
    
}

export async function getUserDetails(id){
    try {
        const userDetails = await db.query("SELECT id, name, email, role, phone, dob FROM users where id = $1 ",[id]);
        if(userDetails.rows.length <= 0) throw new Error(`User not found with id:${id}`);
        return userDetails.rows[0];
    } catch (error) {
        console.error("Error in Get User From DB ",error.message ?? error);
        throw new Error(error.message ?? error);
    }
}

export async function updateUserService(payload, userId){
    try {
        const {name, phone, dob} = payload;

        let fields = [];
        let values = [];
        let count = 1;

        if(name){
            fields.push(`name = $${count++}`)
            values.push(name);
        }
        if(phone){
            fields.push(`phone = $${count++}`)
            values.push(phone);
        }
        if(dob){
            fields.push(`dob = $${count++}`);
            values.push(dob)
        }
        if(fields.length === 0) throw new Error('No Fields to update');

        values.push(userId);
        const query = `UPDATE users SET ${fields.join(',')} WHERE id = $${count} RETURNING id, name, email, phone, dob, role`;
        
        const result = await db.query(query,values);
        return result.rows[0];

    } catch (error) {
        throw new Error(error.message ?? error);
    }

}


