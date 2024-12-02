import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://674d90b2635bad45618bd91f.mockapi.io";

function Edit() {
  const { id } = useParams();
  const [todo, setTodo] = useState({
    name: "",
  });

  async function fetchTodo(todoId) {
    try {
      const response = await axios.get(`${BASE_URL}/todo/${todoId}`);
      setTodo(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  function handleNameChange(event) {
    setTodo((previousState) => ({
      ...previousState,
      name: event.target.value,
    }));
  }

  async function updateName() {
    try {
      await axios.put(`${BASE_URL}/todo/${id}`, {
        name: todo.name,
      });
      alert("Update Successful!");
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchTodo(id);
  }, [id]);

  return (
    <>
      <div>Hello Edit page {id}</div>
      <div>{todo.name}</div>
      <div>
        <input type="text" onChange={handleNameChange} value={todo.name} />
        {todo.status}
      </div>
      <button onClick={updateName}>Edit</button>
    </>
  );
}

export default Edit;
