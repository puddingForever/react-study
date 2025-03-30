import SideBar from "./components/SideBar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import CreateProject from "./components/CreateProject.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";
import { useProjects } from "./hooks/useProjects.js";

function App() {
  // 커스텀 훅에서 상태와 함수를 가져옵니다.
  const {
    projects,
    selectedProject,
    isCreatingProject,
    selectProject,
    startCreatingProject,
    saveProject,
    deleteProject,
    clearTaskFromProject,
    handleClearTaskToProject,
  } = useProjects();

  // 현재 렌더링할 컴포넌트를 결정하는 로직
  let currentView;
  if (isCreatingProject) {
    // 프로젝트 생성 모드일 때는 CreateProject 컴포넌트를 렌더링
    currentView = <CreateProject onClickSaveProject={saveProject} />;
  } else if (selectedProject) {
    // 프로젝트가 선택된 상태에서는 ProjectDetail 컴포넌트를 렌더링
    currentView = (
      <ProjectDetail
        project={selectedProject}
        onClickDeleteProject={deleteProject} // 프로젝트 삭제 함수
        onClickAddTask={clearTaskFromProject} // 작업 추가 함수
        onClickClearTask={handleClearTaskToProject} // 작업 삭제 함수
      />
    );
  } else {
    // 프로젝트가 선택되지 않았을 때는 NoProjectSelected 컴포넌트를 렌더링
    currentView = (
      <NoProjectSelected onClickCreatingProject={startCreatingProject} />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      {/* 사이드바에서 프로젝트 목록과 생성 버튼을 표시 */}
      <SideBar
        projects={projects} // 프로젝트 목록을 사이드바로 전달
        onClickSelectedProject={selectProject} // 프로젝트 클릭 시 실행되는 함수
        onClickCreatingProject={startCreatingProject} // 프로젝트 생성 버튼 클릭 시 실행되는 함수
      />
      {/* 현재 상태에 맞는 뷰를 렌더링 */}
      {currentView}
    </main>
  );
}

export default App;
