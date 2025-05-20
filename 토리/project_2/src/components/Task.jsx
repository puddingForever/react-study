import { useRef } from "react";

export default function Task({ currentTodo, setTodoList }) {
  const { task } = currentTodo || {};
  const isTask = currentTodo.task.length !== 0;
  const taskRef = useRef();

  //태스크에 입력한 인풋 해당 todo의 task에 추가하기
  const handleAddTask = (e) => {
    e.preventDefault();
    const taskValue = taskRef.current?.value?.trim();
    //각 객체에서
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === currentTodo.id
          ? { ...todo, task: [...todo.task, taskValue] }
          : todo
      )
    );
    taskRef.current.value = "";
    taskRef.current.focus();
  };

  const handleDeleteTask = (index) => {
    const removeTask = currentTodo.task.filter((_, idx) => idx !== index);
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === currentTodo.id ? { ...todo, task: removeTask } : todo
      )
    );
  };
  return (
    <form onSubmit={handleAddTask} className="taskWrapper">
      <h4 className="mdText mb12">Tasks</h4>
      <div className="mgBtm flex">
        <input className="inputStyle" type="text" ref={taskRef} />
        <button type="submit" className="commonBtn">
          Add Task
        </button>
      </div>
      <ul>
        {!isTask && <p>This project does not hane any tasks yet</p>}
        {isTask &&
          task?.map((list, idx) => {
            return (
              <li className="taskList" key={idx}>
                <p className="taskItem">{list}</p>
                <button
                  className="textBtn"
                  type="button"
                  onClick={() => handleDeleteTask(idx)}
                >
                  clear
                </button>
              </li>
            );
          })}
      </ul>
    </form>
  );
}
