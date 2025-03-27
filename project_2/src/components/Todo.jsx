import { useOutletContext } from "react-router-dom";

export default function Todo() {
  const { todoList } = useOutletContext();
  console.log(todoList);
  return (
    <article>
      <button>delete</button>
      <div>
        <h3>title</h3>
        <span>date</span>
        <p>content</p>
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
