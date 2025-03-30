import { useState } from "react";

export function useProjects() {
  // 프로젝트 목록을 관리하는 상태 변수
  const [projects, setProjects] = useState([]);

  // 현재 선택된 프로젝트를 관리하는 상태 변수
  const [selectedProject, setSelectedProject] = useState(null);

  // 프로젝트 생성 모드 여부를 관리하는 상태 변수
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // 프로젝트를 선택할 때 실행되는 함수
  function selectProject(newSelectedProject) {
    // 프로젝트 생성 모드 종료
    setIsCreatingProject(false);
    // 선택된 프로젝트를 업데이트
    setSelectedProject(newSelectedProject);
  }

  // '프로젝트 생성' 버튼을 눌렀을 때 실행되는 함수
  function startCreatingProject() {
    // 프로젝트 생성 모드로 전환
    setIsCreatingProject(true);
    // 선택된 프로젝트 초기화
    setSelectedProject(null);
  }

  // 새로운 프로젝트를 저장하는 함수
  function saveProject(projectTitle, projectDescription, projectDueDate) {
    // 새로운 프로젝트 객체를 이전 프로젝트 목록에 추가
    setProjects((prevProjects) => [
      ...prevProjects,
      {
        title: projectTitle, // 프로젝트 제목
        description: projectDescription, // 프로젝트 설명
        dueDate: projectDueDate, // 프로젝트 기한
        tasks: [], // 프로젝트에 처음 생성되는 작업 목록은 빈 배열
      },
    ]);

    // 프로젝트 생성 모드 종료
    setIsCreatingProject(false);
  }

  // 프로젝트를 삭제하는 함수
  function deleteProject(projectToDelete) {
    // 주어진 프로젝트를 제외한 나머지 프로젝트들을 상태로 업데이트
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project !== projectToDelete),
    );
    // 선택된 프로젝트를 초기화
    setSelectedProject(null);
  }

  // 프로젝트 목록에서 특정 프로젝트를 업데이트하는 함수
  function updateProjectInList(updatedProject) {
    // 프로젝트 제목을 기준으로 동일한 프로젝트를 찾아 업데이트
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.title === updatedProject.title ? updatedProject : project,
      ),
    );
  }

  // 프로젝트에 새로운 작업을 추가하는 함수
  function clearTaskFromProject(currentProject, newTask) {
    // 현재 프로젝트에 새로운 작업을 추가하여 업데이트
    const updatedProject = {
      ...currentProject,
      tasks: [...currentProject.tasks, newTask], // 새 작업을 기존 작업 목록에 추가
    };

    // 선택된 프로젝트를 업데이트
    setSelectedProject(updatedProject);
    // 프로젝트 목록도 업데이트
    updateProjectInList(updatedProject);
  }

  // 프로젝트에서 작업을 삭제하는 함수
  function handleClearTaskToProject(currentProject, index) {
    // 특정 인덱스를 제외한 작업 목록을 생성
    const updatedTasks = currentProject.tasks.filter(
      (_, i) => i !== currentProject.tasks.length - 1 - index, // 삭제할 작업 제외
    );
    const updatedProject = { ...currentProject, tasks: updatedTasks };

    // 선택된 프로젝트를 업데이트
    setSelectedProject(updatedProject);
    // 프로젝트 목록도 업데이트
    updateProjectInList(updatedProject);
  }

  return {
    projects,
    selectedProject,
    isCreatingProject,
    selectProject,
    startCreatingProject,
    saveProject,
    deleteProject,
    clearTaskFromProject,
    handleClearTaskToProject,
  };
}
