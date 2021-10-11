import express from 'express';
const router = express.Router();

import TaskController from '../controllers/task.js';
import checkAuth from '../middleware/check-auth.js'

router.get("/", checkAuth, TaskController.task_get_all);

router.post("/", checkAuth, TaskController.tasks_create_task);

router.get("/:taskId", TaskController.tasks_get_task);

router.patch("/:taskId", checkAuth, TaskController.tasks_update_task);

router.delete("/:taskId", checkAuth, TaskController.task_delete);


export default router
