import { useOutletContext, useParams } from "react-router-dom";

export default function Todo() {
  const { todoList } = useOutletContext();
  const params = useParams();
  const currentTodo = todoList?.find((todo) => todo?.id === params?.id);

  const { title, description, date } = currentTodo || {};
  return (
    <article>
      <button>delete</button>
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
