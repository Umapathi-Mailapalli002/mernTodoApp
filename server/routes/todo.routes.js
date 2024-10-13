import { Router } from "express";
import {
  addTodo,
  deleteTodo,
  getAllTodos,
  toggleIsComplete,
  updateTodo,
} from "../controllers/todo.controller.js";

const router = Router();

router.get("/get-todos", getAllTodos);
router.post("/add-todo", addTodo);
router.post("/toggle-complete/:_id", toggleIsComplete);
router.patch("/update-todo/:_id", updateTodo);
router.post("/delete-todo/:_id", deleteTodo);

export default router;