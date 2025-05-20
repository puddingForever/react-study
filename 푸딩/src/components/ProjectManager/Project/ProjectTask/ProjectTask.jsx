/**
 * 프로젝트 타스크
 * - 프로젝트별 타스크를 추가
 * @param {Function} onAddTask - 새로운 타스크 추가 함수 
 * @param {Array} taskList - 프로젝트별 타스크 목록
 * 
 */

import { useState } from "react";
import Button from "../../Button";


const ProjectTask = ({ onAddTask , taskList}) => {
    const [newTask, setNewTask] = useState("");

    // input 필드 변경
    const handleTaskChange = (e) => setNewTask(e.target.value);
    // 타스크 추가 
    const handleAddTask = () => {
        onAddTask(newTask);
        setNewTask(""); 
    }
    return (
        <>
            <h1 className="font-bold text-4xl">Tasks</h1>
            <div  className="">
                <input type="text" className="bg-gray-200 focus:ring-2 focus:ring-inset focus:ring-blue-400 focus:outline-none w-64 p-0.5" value={newTask} onChange={handleTaskChange}/> <Button onClick={handleAddTask}>Add Task</Button>
            </div>
            <ul className="bg-gray-100">
                {taskList.map((task,i) => 
                    <li key={i}>{task}</li>
                )} 
            </ul>
        </>
    )
}

export default ProjectTask;