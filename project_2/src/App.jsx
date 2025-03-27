import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  return (
    <>
      <div className="todoWrapper">
        <Sidebar todoList={todoList} />
        <Outlet context={{ todoList, setTodoList }} />
      </div>
    </>
  );
}

export default App;
