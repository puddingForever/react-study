import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  return (
    <main className="todoWrapper">
      <Sidebar todoList={todoList} />
      <div className="content">
        <Outlet context={{ todoList, setTodoList }} />
      </div>
    </main>
  );
}

export default App;
