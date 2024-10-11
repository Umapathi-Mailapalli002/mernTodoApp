import axios from "axios";

const API_URL = '/get-todos'; // Base URL for getting todos
const ADD_TODO_URL = '/add-todo'; // URL for adding a todo
const UPDATE_TODO_URL = '/update-todo'; // Base URL for updating a todo
const DELETE_TODO_URL = '/delete-todo'; // Base URL for deleting a todo
const BASE_URL = "http://localhost:8000/api/v1";
//fetch todos
const fetchTodos = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/${API_URL}`);
        return res.data;
    } catch (error) {
        console.log("error on fetching todos", error);
        throw error;
    }
}


//update a Todo
const updateTodo = async(id, content) => {
try {
    const res = await axios.patch(`${BASE_URL}/${UPDATE_TODO_URL}/${id}`, {content});
    return res.data;
} catch (error) {
    console.error('Error updating todo:', error);
    throw error;
}
};


//add a todo
const addTodo = async(content) => {
try {
    const res = await axios.post(`${BASE_URL}/${ADD_TODO_URL}`, {content});
    return res.data;
} catch (error) {
    console.error('Error adding todo:', error);
        throw error;
}
}

// delete a todo
const deleteTodo = async() => {
   try {
     const res = await axios.post(`${BASE_URL}/${
        DELETE_TODO_URL
     }/${id}`);
     return res.data
   } catch (error) {
    console.error('Error deleting todo:', error);
        throw error;
   }
}

//exports
export {
    addTodo,
    fetchTodos,
    deleteTodo,
    updateTodo
}

