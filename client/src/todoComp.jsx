import React from "react";
import { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useRef } from "react";
import { addTodo, deleteTodo, fetchTodos, isComplete, updateTodo } from "./api";
function todoComp() {
  const [activeButton, setActiveButton] = useState("todo");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isCompleted, setIsCompleted] = useState([]);
  const editInput = useRef(null);
  const [editId, setEditId] = useState(null);

  // access the inputs
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDes = (e) => {
    setDescription(e.target.value);
  };

  const loadAllTodos = async () => {
    try {
      const res = await fetchTodos();
      const todos = res.data;
      const inCompletedTodos = todos.filter((todo) => !todo.isCompleted);
      const CompletedTodos = todos.filter((todo) => todo.isCompleted);
      if (inCompletedTodos) {
        setTodos(inCompletedTodos);
      }
      if (CompletedTodos) {
        setIsCompleted(CompletedTodos);
      }
    } catch (error) {
      console.log("error on fetching todos", error);
      throw error;
    }
  };
  // handle the click button add
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const addtodo = await addTodo(title, description);
      if (title.trim() !== "" && description.trim() !== "") {
        setTodos((prev) => [{ ...addtodo }, ...prev]);
      }
      loadAllTodos();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log("error on adding todo", error);
      throw error;
    }
  };

  //edit todo
  const handleEdit = async (id, title, description) => {
    const editItem = await updateTodo(id, title, description);
    // setting the text into to input boxes on clicking on the edit button
    setTitle(title);
    setDescription(description);

    //update button
    setShowUpdate(true);

    //auto focusing on click on the edit button
    editInput.current.focus();

    // save editId in state
    setEditId(id);
  };

  //update todo
  const handleUpdate = async () => {
    // Assuming you have some state to store the updated todos and input values
    const id = editId;
    await handleEdit(id, title, description);
    // Reset input values and hide update button
    setTitle("");
    setDescription("");
    setShowUpdate(false);
    loadAllTodos();
  };

  //delete todo
  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadAllTodos();
  };

  //mark as complete todo
  const handleCompleteToggle = async (id, isCompleted) => {
    // Toggle the completion status
    const isCompleteTodo = !isCompleted;
    
    try {
      // Call your API to update the todo
      await isComplete(id, isCompleteTodo);
      
      // After successfully toggling, reload the todos to refresh the UI
      loadAllTodos();
    } catch (error) {
      console.error('Error toggling complete:', error);
      // Handle the error appropriately (e.g., show a notification)
    }
  };
  
  //todo tasks
  const todoTask = () => {
    setActiveButton("todo");
    loadAllTodos();
  };

  //completed Tasks
  const completedTask = () => {
    setActiveButton("completed");
    loadAllTodos();
  };

  useEffect(() => {
    loadAllTodos();
  }, []);
  return (
    <div
      id="todoWrapper"
      className="bg-[#353434]  p-[2%] w-[90vw] mx-auto sm:w-fit md:w-fit lg:w-fit sm:mx-auto lg:mx-auto md:mx-auto mt-[3%] max-h-[90vh] overflow-y-auto shadow-[0_5px_7px_rgba(27,27,27)]"
    >
      <div className="sm:flex md:flex lg:flex sm:items-center  md:items-center lg:items-center sm:justify-center md:justify-center lg:justify-center border-b-[1px] border-[rgb(78,78,78)] py-6">
        <div className="sm:flex md:flex lg:flex sm:flex-col md:flex-col lg:flex-col sm:items-[flex-start] lg:items-[flex-start] md:items-[flex-start]  sm:mr-6 md:mr-6 lg:mr-6 flex justify-center items-center">
          <label className="font-medium mb-[10px] mr-6">Title:</label>
          <input
            ref={editInput}
            className="text-black  p-2 border-none sm:w-64 md:w-64 lg:w-64 w-72 focus:outline-2 focus:outline-[rgb(0,230,122)]"
            type="text"
            placeholder="What is your task title?"
            onChange={handleChangeTitle}
            value={title}
          />
        </div>
        <div className="sm:flex md:flex lg:flex sm:flex-col md:flex-col lg:flex-col sm:items-[flex-start] lg:items-[flex-start] md:items-[flex-start] sm:mr-6 md:mr-6 lg:mr-6 sm:mt-0 md:mt-0 lg:mt-0 mt-3 flex justify-center items-center ">
          <label className="font-medium mb-[10px] mr-1">Description:</label>
          <input
            className="text-black p-2 border-none w-64 focus:outline-2 focus:outline-[rgb(0,230,122)]"
            type="text"
            placeholder="What is your task description?"
            onChange={handleChangeDes}
            value={description}
          />
        </div>
        {!showUpdate && (
          <div className="flex justify-center">
            <button
              className="bg-[rgb(0,230,122)] text-white border-none rounded-none sm:mt-8 md:mt-8 lg:mt-8 p-[10px] sm:w-[60px] md:w-[60px] lg:w-[60px] w-[90vw] cursor-pointer hover:bg-[rgb(4,196,106)] mt-6 "
              type="button"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        )}
        {showUpdate && (
          <div className="flex justify-center">
            <button
              className=" bg-[rgb(0,230,122)] text-white border-none rounded-none sm:mt-8 md:mt-8 lg:mt-8 p-[10px] font-bold sm:w-[70px] md:w-[70px] lg:w-[70px] w-[90vw] cursor-pointer hover:bg-[rgb(4,196,106)] mt-6 sm:-ml-3 md:-ml-3 lg:-ml-3"
              type="button"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        )}
      </div>

      <div className="mb-4 ">
        <button
          type="button"
          className={`bg-[${
            activeButton === "todo" ? "rgb(0,230,122)" : "#575656"
          }] text-white border-none rounded-none shadow-lg mt-6 p-[10px] w-fit cursor-pointer`}
          onClick={todoTask}
        >
          To Do
        </button>
        <button
          type="button"
          className={`bg-[${
            activeButton === "completed" ? "rgb(0,230,122)" : "#575656"
          }] text-white border-none rounded-none shadow-lg mt-6 p-[10px] w-fit cursor-pointer`}
          onClick={completedTask}
        >
          Completed
        </button>
      </div>
      {activeButton === "todo" &&
        todos.map((todo) => {
          return (
            <div key={todo._id} className="todoo flex  bg-[#414040] shadow-xl">
              <div className="bg-[#414040] flex  flex-col justify-between p-3 mb-[10px] w-[70vw]">
                <h3 className="font-bold text-2xl text-[rgb(0,230,122)] m-0">
                  {todo.title}
                </h3>
                <p className="text-xs text-[161,161,161] mt-2">
                  {todo.description}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <FaEdit
                  onClick={() =>
                    handleEdit(todo._id, todo.title, todo.description)
                  }
                  className="mx-1 text-xl cursor-pointer hover:text-[rgb(4,196,106)] sm:mr-2 md:mr-2 lg:mr-2"
                />
                <FaCheck
                  onClick={() =>
                    handleCompleteToggle(todo._id, todo.isCompleted)
                  }
                  className="text-2xl cursor-pointer ml-1  text-[rgb(0,230,122)] hover:text-[rgb(4,196,106)] sm:mr-2 md:mr-2 lg:mr-2 mx-1"
                />
                <MdDeleteOutline
                  onClick={() => handleDelete(todo._id)}
                  className="text-2xl cursor-pointer hover:text-[rgb(4,196,106)] sm:mr-2 md:mr-2 lg:mr-2 mr-1"
                />
              </div>
            </div>
          );
        })}

      {activeButton === "completed" &&
        isCompleted.map((todo) => {
          let now = new Date();
          let dd = now.getDate();
          let mm = now.getMonth();
          let yyyy = now.getFullYear();
          let h = now.getHours();
          let m = now.getMinutes();
          let s = now.getSeconds();
          const completedOn =
            dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;
          return (
            <div key={todo._id} className="todoo flex  bg-[#414040] shadow-xl">
              <div className="bg-[#414040] flex  flex-col justify-between p-3 mb-[10px] w-[70vw]">
                <h3 className="font-bold text-2xl text-[rgb(0,230,122)] m-0">
                  {todo.title}
                </h3>
                <p className="text-xs text-[161,161,161] mt-2">
                  {todo.description}
                </p>
                <p className="text-xs text-[161,161,161] mt-2">
                  <i>Completed on: {completedOn}</i>
                </p>
              </div>
              <div className="flex justify-center items-center">
                <MdDeleteOutline
                  onClick={() => handleDelete(todo._id)}
                  id={todo._id}
                  className="text-3xl cursor-pointer hover:text-[rgb(4,196,106)] ml-8"
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default todoComp;
