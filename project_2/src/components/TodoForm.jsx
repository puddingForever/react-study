import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function TodoForm() {
  const { setTodoList } = useOutletContext();
  const [newTodo, setNewTodo] = useState();
  const navigate = useNavigate();

  const handleUpdateNewTodo = (e) => {
    e.preventDefault();
    const addTodoId = { ...newTodo, id: uuidv4() };
    setTodoList((prev) => [...prev, addTodoId]);
    navigate("/");
  };

  const handleNewTodo = (e) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    //프로젝트 추가하기를 누르면 나오는 폼
    <form onSubmit={handleUpdateNewTodo}>
      <div>
        <button>cancel</button>
        <button>save</button>
      </div>
      <div>
        <div>
          <label htmlFor="">title</label>
          <input name="title" type="text" onChange={handleNewTodo} />
        </div>
        <div>
          <label htmlFor="">description</label>
          <textarea name="description" onChange={handleNewTodo}></textarea>
        </div>
        <div>
          <label htmlFor="">due-date</label>
          <input name="date" type="date" onChange={handleNewTodo} />
        </div>
      </div>
    </form>
  );
}
