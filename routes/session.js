import express from 'express';
const router = express.Router();

import SessionController from '../controllers/session.js';
import checkAuth from '../middleware/check-auth.js'

router.get("/", checkAuth, SessionController.session_get_all);

router.post("/", checkAuth, SessionController.sessions_create_session);



export default router
