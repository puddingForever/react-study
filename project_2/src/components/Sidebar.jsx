import { useNavigate } from "react-router-dom";

export default function Sidebar({ todoList }) {
  const navigate = useNavigate();
  const handleUpdateCurrentTodo = (todoId) => {
    //클릭한 투두와 아이디가 일치하는 투두 활성화, 이동
    navigate(`${todoId}`);
  };
  return (
    <article>
      <div className="sideTop">
        <strong>Your Project</strong>
        <button onClick={() => navigate("/newTodo")}>Add Project</button>
      </div>
      <ul>
        {todoList?.map((todo) => (
          <li key={todo.id} onClick={() => handleUpdateCurrentTodo(todo.id)}>
            {todo.title}
          </li>
        ))}
      </ul>
    </article>
  );
}
