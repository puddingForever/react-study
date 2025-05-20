import ProjectNotFound from './ProjectNotFound';
import ProjectInfo from './ProjectInfo/ProjectInfo';
import ProjectTask from './ProjectTask/ProjectTask';
import { useState } from 'react';

/**
 * 프로젝트 박스 
 * 
 * @param {Function} onOpenModal - 새 프로젝트 추가모달 (+Add Project)
 * @param {Function} onDeleteProject - 프로젝트 삭제 함수
 * @param {Object} project - 현재 선택된 프로젝트
 */
const MainBox = ({ onOpenModal, onDeleteProject ,project }) => {
  // 프로젝트별 타스크 목록 
  const [taskList, setTaskList] = useState({}); // { 1 : [] , 2 :[] , 3 : []} 

  // 새로운 타스크추가
  const handleAddTask = (newTask) => {
    if(!taskList[project.id]){
      taskList[project.id] = [];
    }

    taskList[project.id].push(newTask)
    setTaskList({...taskList});
  }

  // 프로젝트 삭제 
  const handleDeleteProject = () => {
    // 타스크 삭제 후 
      delete taskList[project.id]
      setTaskList({...taskList})
    // 프로젝트 삭제 
      onDeleteProject();
  }


  return (
    <div className="h-screen flex justify-center align-middle col-span-3">
     {project ? 
          <div className="mt-28 w-1/2 -translate-x-1/3 flex flex-col gap-2">
              <ProjectInfo project={project} onDeleteProject={handleDeleteProject}/>
              <ProjectTask onAddTask={handleAddTask} taskList={taskList[project.id] || []}/>
            </div> 
            :  
          <ProjectNotFound onOpenModal={onOpenModal} />}
    </div>
  );
};

export default MainBox;