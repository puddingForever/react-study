import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Input from "./Input";

export default function TodoForm() {
  const { setTodoList } = useOutletContext();
  const dateRef = useRef();
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    date: settingToday(),
    task: [],
  });
  const navigate = useNavigate();

  const handleUpdateNewTodo = (e) => {
    e.preventDefault();
    const isTitleFill = newTodo.title.trim().length;
    const isDescriptionFill = newTodo.description.trim().length;
    if (isTitleFill === 0 || isDescriptionFill === 0) {
      return alert("빈칸을 모두 채워주세요");
    }
    const addTodoId = { ...newTodo, id: uuidv4() };
    setTodoList((prev) => [...prev, addTodoId]);
    navigate(`/${addTodoId.id}`);
  };

  const handleNewTodo = (e) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({ ...prev, [name]: value, task: [] }));
  };

  const handleCancel = () => navigate("/");

  function settingToday() {
    const today = new Date().toISOString().split("T")[0];
    return today;
  }
  useEffect(() => {
    settingToday();
  }, []);

  const handleOpenDate = () => {
    dateRef?.current.showPicker();
  };

  return (
    //프로젝트 추가하기를 누르면 나오는 폼
    <div>
      <form onSubmit={handleUpdateNewTodo}>
        <div className="right">
          <button className="textBtn" type="button" onClick={handleCancel}>
            cancel
          </button>
          <button className="commonBtn" type="submit">
            save
          </button>
        </div>
        <div className="inputWrapper">
          <Input
            label="title"
            name="title"
            type="text"
            onChange={handleNewTodo}
          />
          <Input
            label="description"
            name="description"
            textarea={true}
            onChange={handleNewTodo}
          />
          <Input
            label="due-date"
            name="date"
            ref={dateRef}
            type="date"
            value={newTodo.date}
            onChange={handleNewTodo}
            onClick={handleOpenDate}
          />
        </div>
      </form>
    </div>
  );
}
