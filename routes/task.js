import express from "express";
import {
  deleteTask,
  getmyTask,
  newTask,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticate } from "../middleware/auth.js";
import { getTaskById } from "../controllers/task.js";

const router = express.Router();

router.post("/new", isAuthenticate, newTask);
router.get("/gettask", isAuthenticate, getmyTask);
router.get("/gettask/:id", isAuthenticate, getTaskById);
router
  .route("/:id")
  .put(isAuthenticate, updateTask)
  .delete(isAuthenticate, deleteTask);

export default router;
