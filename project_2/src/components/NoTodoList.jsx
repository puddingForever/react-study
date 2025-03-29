import { useNavigate } from "react-router-dom";

export default function NoTodoList() {
  const navigate = useNavigate();
  const handleMoveTodoForm = () => {
    navigate("/newTodo");
  };
  return (
    <article className="center noTodolist">
      <p className="mdText">NoTodoList</p>
      <p>select a project or get started with new one</p>
      <button className="commonBtn" onClick={handleMoveTodoForm}>
        create new project
      </button>
    </article>
  );
}
