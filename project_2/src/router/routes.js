import { createBrowserRouter } from "react-router";
import TodoForm from "../components/TodoForm";
import App from "../App";
import TodoPage from "../Page/TodoPage";
import Todo from "../components/Todo";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: TodoPage },
      { path: ":id", Component: Todo },
      { path: "newTodo", Component: TodoForm },
    ],
  },
]);
