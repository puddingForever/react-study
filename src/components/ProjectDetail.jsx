import React, { useRef, useState } from "react";
import ProjectTask from "./ProjectTask.jsx"; // ProjectTask 컴포넌트 임포트

// ProjectDetail 컴포넌트 - 프로젝트의 세부 사항을 표시
function ProjectDetail({
  project,
  onClickDeleteProject,
  onClickAddTask,
  onClickClearTask,
}) {
  // 프로젝트의 마감일을 'MM/DD/YYYY' 형식으로 변환
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  // 새로운 작업을 추가하는 함수
  function handleAddTaskClick(newTask) {
    // 입력된 작업이 비어있지 않으면 작업 추가
    if (newTask.trim() !== "") {
      onClickAddTask(project, newTask);
    }
  }

  // 작업을 삭제하는 함수
  function handleClearTaskClick(index) {
    onClickClearTask(project, index); // 인덱스를 기준으로 작업 삭제
  }

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          {/* 프로젝트 제목을 표시 */}
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          {/* 삭제 버튼 클릭 시 프로젝트 삭제 함수 호출 */}
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={() => onClickDeleteProject(project)}
          >
            Delete
          </button>
        </div>
        {/* 프로젝트 마감일 표시 */}
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        {/* 프로젝트 설명을 표시, 줄 바꿈을 허용 */}
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>

      {/* ProjectTask 컴포넌트에 작업 리스트를 전달하고, 추가 및 삭제 핸들러를 전달 */}
      <ProjectTask
        tasks={project.tasks}
        onClickAddTask={handleAddTaskClick}
        onClickClear={handleClearTaskClick}
      />
    </div>
  );
}

export default ProjectDetail;
