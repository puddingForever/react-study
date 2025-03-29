import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Sidebar({ todoList }) {
  const navigate = useNavigate();
  const [isActive, setActive] = useState();
  const param = useParams();

  const handleUpdateCurrentTodo = (todoId) => {
    //클릭한 투두와 아이디가 일치하는 투두 활성화, 이동
    const currentTodo = todoList?.find((todo) => todo.id === todoId);
    setActive(currentTodo.id);
    navigate(`/${currentTodo.id}`);
  };

  useEffect(() => {
    setActive(param.id ? param.id : todoList[0]?.id);
  }, [param.id]);

  return (
    <aside className="sideBar">
      <div className="sideTop">
        <strong
          className="mdText mgBtm white pointer"
          onClick={() => navigate("/")}
        >
          Your Projects
        </strong>
        <button
          onClick={() => navigate("/newTodo")}
          className="commonBtn mgBtm"
        >
          + Add Project
        </button>
      </div>
      <ul>
        {todoList?.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleUpdateCurrentTodo(todo.id)}
            className={`menuTitle ${todo.id === isActive ? "active" : ""}`}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </aside>
  );
}
