import express from 'express';
const router = express.Router();

import UserController from '../controllers/user.js';
import checkAuth from '../middleware/check-auth.js'

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);



export default router
