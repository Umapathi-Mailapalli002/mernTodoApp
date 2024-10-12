import mongoose, { isValidObjectId } from "mongoose";
import { Todo } from "../models/todo.model.js";

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt:-1 });
    if (!todos) {
      return res.status(200).json({ null: "there is no todo to fetch" });
    }

    return res
      .status(200)
      .json({ msg: "fetch the todos successfully", data: todos });
  } catch (error) {
    console.log("error on fetching the todos", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching todos" });
  }
};

const addTodo = async (req, res) => {
  const {title, description} = req.body;
  try {
    if (!title && !description) {
      return res.status(400).json({ error: "title and description both are required" });
    }
    const todo = await Todo.create({
      title,
      description
    });

    return res.status(201).json({
      msg: "Todo added successfully",
      data: todo,
    });
  } catch (error) {
    console.log("error on adding todo", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding the todo" });
  }
};

const updateTodo = async (req, res) => {
  const {title, description} = req.body;
  const { _id } = req.params;
  
  if (!_id || !isValidObjectId(_id)) {
    console.log(_id);
    console.log("it is not a valid object id");
    return res.status(400).json({ error: "Invalid Object ID" });
}


  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      _id,
      { $set: { title, description } },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    return res
      .status(200)
      .json({ msg: "Data was successfully updated", data: updatedTodo });
  } catch (error) {
    console.log("Error updating the todo:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the todo" });
  }
};

const deleteTodo = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(_id);
    if (!deletedTodo) {
      return res
      .status(404)
      .json({ error: "not found todo" });
    }
    return res.status(200).json({ msg: "Todo successfully deleted", data: deletedTodo });
  } catch (error) {
    console.log("error on deleting todo", error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the todo" });
  }
};

export { getAllTodos, addTodo, updateTodo, deleteTodo };
