import { useNavigate, useOutletContext, useParams } from "react-router-dom";

export default function Todo() {
  const { todoList, setTodoList } = useOutletContext();
  const params = useParams();
  const currentTodo =
    todoList?.find((todo) => todo?.id === params?.id) || todoList[0];
  //기본 0번째 todo
  const { title, description, date } = currentTodo || {};
  const navigate = useNavigate("/");
  //선택한 투두 삭제
  const handleDeleteTodo = () => {
    setTodoList((prev) => prev.filter((todo) => todo?.id !== currentTodo.id));
    navigate("/");
  };

  return (
    <article>
      <button type="button" onClick={handleDeleteTodo}>
        delete
      </button>
      <div>
        <h3>{title}</h3>
        <span>{description}</span>
        <p>{date}</p>
      </div>
      <div>
        <h4>Tasks</h4>
        <div>
          <input type="text" />
          <button>Add Task</button>
        </div>
        <div>
          <div>
            <p>내용</p>
            <button>clear</button>
          </div>
        </div>
      </div>
    </article>
  );
}
