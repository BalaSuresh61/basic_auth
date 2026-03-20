import express from 'express';
import { registerAdmin } from '../controllers/registerController.js'
const adminRouter = express.Router();

adminRouter.post('/register',registerAdmin);

export default adminRouter;