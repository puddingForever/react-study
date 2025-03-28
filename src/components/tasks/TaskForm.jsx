import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

// 태스크 추가 폼
const TaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");

  // Add 버튼 클릭시
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <Input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-grow p-2 bg-gray-200 focus:outline-none mr-2"
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default TaskForm;