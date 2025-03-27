import { useNavigate } from "react-router-dom";

export default function NoTodoList() {
  const navigate = useNavigate();
  const handleMoveTodoForm = () => {
    navigate("/newTodo");
  };
  return (
    <div>
      <p>NoTodoList</p>
      <p>select a project or get started with new one</p>
      <button onClick={handleMoveTodoForm}>create new project</button>
    </div>
  );
}
