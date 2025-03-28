import { useState } from "react";
import ProjectList from "./components/projects/ProjectList";
import ProjectDetail from "./components/projects/ProjectDetail";

// 페이지 구조잡기 및 프로젝트 관리 
const App = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(projects.length > 0 ? projects[0] : null);
  const [showForm, setShowForm] = useState(false);

  // 프로젝트 추가 버튼 클릭시
  const handleAddProject = () => {
    setSelectedProject(null);
    setShowForm(true);
  };

  // 프로젝트 선택시
  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setShowForm(false);
  };

  // 프로젝트 저장 버튼 클릭시
  const handleSaveProject = (project) => {
    const newProject = { ...project, id: Date.now().toString(), tasks: [] };

    setProjects(prevProjects => [...prevProjects, newProject]);
    setSelectedProject(newProject);
    setShowForm(false);
  };

  // 프로젝트 삭제 버튼 클릭시
  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
    setSelectedProject(null);
  };

  // 프로젝트의 task 업데이트
  const handleUpdateTasks = (projectId, tasks) => {
    setProjects(projects.map(project =>
      project.id === projectId ? { ...project, tasks } : project
    ));

    setSelectedProject({ ...selectedProject, tasks });
  };

  return (
    <div className="flex h-screen">
      <ProjectList
        projects={projects}
        selectedProject={selectedProject}
        onAddProject={handleAddProject}
        onSelectProject={handleSelectProject}
      />

      <ProjectDetail
        selectedProject={selectedProject}
        showForm={showForm}
        onSave={handleSaveProject}
        onCancel={() => setShowForm(false)}
        onDelete={handleDeleteProject}
        onUpdateTasks={handleUpdateTasks}
        onCreateNew={handleAddProject}
      />
    </div>
  );
};

export default App;
