import { Router } from "express";
import {
  addTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todo.controller.js";

const router = Router();

router.get("/get-todos", getAllTodos);
router.post("/add-todo", addTodo);
router.patch("/update-todo/:_id", updateTodo);
router.post("/delete-todo/:_id", deleteTodo);

export default router;