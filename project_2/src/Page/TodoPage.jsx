import { useOutletContext } from "react-router-dom";
import NoTodoList from "../components/NoTodoList";
import Todo from "../components/Todo";

export default function TodoPage() {
  const { todoList } = useOutletContext();
  const noTodoList = todoList.length === 0;
  return <>{noTodoList ? <NoTodoList /> : <Todo />}</>;
}
