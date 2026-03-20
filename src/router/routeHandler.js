import express from 'express';
import { registerAdmin, registerUser } from '../controllers/registerController.js';
import { login } from '../controllers/loginController.js';
import { tokenController } from '../controllers/tokenController.js';
import { dashboardController } from '../controllers/dashboardController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { logoutController } from '../controllers/logoutController.js';
import adminRouterHandler  from './adminRouteHandler.js';
import { getUser, updateUser } from '../controllers/userController.js';
import { updateProfilePhoto } from '../controllers/profileController.js';
import upload from '../middleware/profileUpload.js'
const router = express.Router();

router.use('/admin',adminRouterHandler);

router.post('/register',registerUser);
router.post('/login',login);
router.post('/refresh-token',tokenController);
router.post('/dashboard', authMiddleware,dashboardController);
router.get('/logout',authMiddleware,logoutController);
router.get('/me', authMiddleware, getUser);
router.put('/me',authMiddleware,updateUser)

router.post('/profile-photo', authMiddleware, upload.single("photo"), updateProfilePhoto)

export default router;