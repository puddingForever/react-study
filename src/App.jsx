import Navbar from './components/ProjectManager/Navbar';
import MainBox from './components/ProjectManager/Project/MainBox';
import CreateProjectModal from './components/ProjectManager/CreateProjectModal';
import './App.css';
import { useRef, useState } from 'react';

const PROJECTS = []; // [ {id :1, title : react, description : learnReact, dueDate : 20240301}]

const App = () => {
  // 모달제어용 ref 
  const dialogRef = useRef(null);
  //프로젝트 리스트 
  const [projectList, setProjectList] = useState(PROJECTS);
  // 현재 선택된 프로젝트 
  const [project, setProject] = useState(null);

  // 모달창 열기 
  const handleOpenMdoal = () => {
      dialogRef.current.open();
  };

  // 프로젝트 추가 , 마지막 프로젝트의 id에서 +1씩 더하여 고유 id값을 유지  
  const handleAddProject = (newProject) => {
      const lastProject = projectList[projectList.length - 1]; 
      const newId = lastProject ? lastProject.id + 1 : 0; 
      const updatedProject = {...newProject, id : newId}
      setProjectList([...projectList, updatedProject ])
  }

  // 특정 프로젝트 클릭
  const handleOpenProject = (project) => {
    setProject(project);
  }

  // 프로젝트 삭제 
  const handleDeleteProject = () => {
    setProjectList((prev) => prev.filter(p => p.id !== project.id))
    setProject(null);
  }

  return (
    <main className="h-screen grid grid-cols-4">
      <Navbar onOpenModal={handleOpenMdoal} onOpenProject={handleOpenProject} projectList={projectList} />
      <MainBox onOpenModal={handleOpenMdoal} onDeleteProject={handleDeleteProject} project={project} />
      <CreateProjectModal ref={dialogRef} onAddProject={handleAddProject} />
    </main>
  );
};

export default App;