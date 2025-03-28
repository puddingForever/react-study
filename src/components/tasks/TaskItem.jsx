import Button from "../common/Button";

// Task
const TaskItem = ({ task, onDelete }) => {
  return (
    <li className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
      <span>{task.text}</span>
      <Button 
        variant="cancel" 
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700"
      >
        Clear
      </Button>
    </li>
  );
};

export default TaskItem;