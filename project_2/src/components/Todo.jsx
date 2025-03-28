import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

export default function Todo() {
  const { todoList, setTodoList } = useOutletContext();
  const [newTask, setNewTask] = useState("");
  const params = useParams();
  const currentTodo =
    todoList?.find((todo) => todo?.id === params?.id) || todoList[0];
  //기본 0번째 todo
  const { title, description, date, task } = currentTodo || {};
  console.log("task", task);
  const navigate = useNavigate("/");
  //선택한 투두 삭제
  const handleDeleteTodo = () => {
    setTodoList((prev) => prev.filter((todo) => todo?.id !== currentTodo.id));
    navigate("/");
  };

  //태스크에 입력한 인풋 해당 todo의 task에 추가하기

  const handleAddTask = (e) => {
    e.preventDefault();
    //각 객체에서
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === currentTodo.id
          ? { ...todo, task: [...todo.task, newTask] }
          : todo
      )
    );
  };

  const handleDeleteTask = (index) => {
    console.log(index);
    const removeTask = currentTodo.task.filter((_, idx) => idx !== index);

    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === currentTodo.id ? { ...todo, task: removeTask } : todo
      )
    );
  };
  console.log("task추가", todoList);
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
      <form onSubmit={handleAddTask}>
        <h4>Tasks</h4>
        <div>
          <input type="text" onChange={(e) => setNewTask(e.target.value)} />
          <button type="submit">Add Task</button>
        </div>
        <ul>
          {task?.map((list, idx) => {
            return (
              <li className="taskList">
                <p>{list}</p>
                <button type="button" onClick={() => handleDeleteTask(idx)}>
                  clear
                </button>
              </li>
            );
          })}
        </ul>
      </form>
    </article>
  );
}
