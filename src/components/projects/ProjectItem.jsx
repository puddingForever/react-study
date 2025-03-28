import { useState, useEffect } from "react";
import TaskForm from "../tasks/TaskForm";
import TaskItem from "../tasks/TaskItem";
import Button from "../common/Button";

// 프로젝트
const ProjectItem = ({ project, onDelete, onUpdateTasks }) => {
  const [tasks, setTasks] = useState([]);

  // 프로젝트가 변경될 때마다 태스크 목록 업데이트
  useEffect(() => {
    setTasks(project.tasks || []);
  }, [project]);

  // Add 버튼 클릭시
  const handleAddTask = (taskText) => {
    const newTaskItem = {
      id: Date.now().toString(),
      text: taskText,
      completed: false
    };
    const updatedTasks = [...tasks, newTaskItem];
    setTasks(updatedTasks);
    onUpdateTasks(project.id, updatedTasks);
  };

  // 삭제 버튼 클릭시
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    onUpdateTasks(project.id, updatedTasks);
  };

  // task 목록
  const taskList = (tasks.length > 0 ? (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDeleteTask}
        />
      ))}
    </ul>
  ) :
    <p className="text-gray-500">This project ~~ yet.</p>
  )

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-gray-800">{project.title}</h1>
        <Button
          variant="cancel"
          onClick={() => onDelete(project.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </Button>
      </div>

      <p className="text-gray-600 mb-4">{project.dueDate}</p>
      <div className="mb-8">
        <p className="text-gray-700">{project.description}</p>
      </div>
      <hr className="my-6" />
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tasks</h2>

        <TaskForm onAddTask={handleAddTask} />

        <div className="bg-gray-100 p-4 rounded">
          {taskList}
        </div>
      </div>
    </div >
  );
};

export default ProjectItem;