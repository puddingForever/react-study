import { useNavigate } from "react-router-dom";

export default function Sidebar({ todoList }) {
  const navigate = useNavigate();
  return (
    <article>
      <div className="sideTop">
        <strong>Your Project</strong>
        <button onClick={() => navigate("/newTodo")}>Add Project</button>
      </div>
      <ul>
        {todoList?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </article>
  );
}
