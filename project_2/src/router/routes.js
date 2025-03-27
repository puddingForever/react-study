import { createBrowserRouter } from "react-router";
import TodoForm from "../components/TodoForm";
import App from "../App";
import TodoPage from "../Page/TodoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: TodoPage },
      { path: ":id", Component: TodoPage },
      { path: "newTodo", Component: TodoForm },
    ],
  },
]);
