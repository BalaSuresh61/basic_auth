import express from 'express';
import routeHandler from './src/router/routeHandler.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());

app.use('/api',routeHandler)
app.get('/',(req,res)=>{
    console.log( req.url);
    res.send({Message : "Welcome"})
})

app.listen(3000,()=>{
    console.log('server is listening on Port 3000')
})