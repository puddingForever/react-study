import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Task from "./Task";

export default function Todo() {
  const { todoList, setTodoList } = useOutletContext();
  const params = useParams();
  const navigate = useNavigate("/");
  const currentTodo =
    todoList?.find((todo) => todo?.id === params?.id) || todoList[0];
  //기본 0번째 todo
  const { title, description, date } = currentTodo || {};

  //선택한 투두 삭제
  const handleDeleteTodo = () => {
    setTodoList((prev) => prev.filter((todo) => todo?.id !== currentTodo.id));
    navigate("/");
  };

  return (
    <article>
      <div className="right">
        <button className="textBtn" type="button" onClick={handleDeleteTodo}>
          delete
        </button>
      </div>
      <div>
        <h3 className="mdText mgBtm"> {title}</h3>
        <p className="mgBtm"> {date}</p>
        <span className="description">{description}</span>
      </div>
      <hr />
      <Task currentTodo={currentTodo} setTodoList={setTodoList} />
    </article>
  );
}
