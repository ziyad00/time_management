import express from 'express';
const router = express.Router();

import TaskController from '../controllers/task.js';
import checkAuth from '../middleware/check-auth.js'

router.get("/", checkAuth, TaskController.task_get_all);

router.post("/", checkAuth, TaskController.tasks_create_task);



export default router
