import React from "react";

// SideBar 컴포넌트 - 프로젝트 목록과 "프로젝트 추가" 버튼을 포함하는 사이드바 컴포넌트
function SideBar({ projects, onClickSelectedProject, onClickCreatingProject }) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        YOUR PROJECTS
      </h2>

      {/* "프로젝트 추가" 버튼 */}
      <button
        className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
        onClick={onClickCreatingProject} // 버튼 클릭 시 onClickCreatingProject 함수 실행
      >
        + Add Project
      </button>

      {/* 프로젝트 목록 */}
      <ul className="mt-8">
        {/* projects 배열을 순회하며 각 프로젝트를 버튼으로 렌더링 */}
        {projects.map((project) => {
          return (
            // 각 프로젝트 버튼
            <button
              key={project.title} // 각 프로젝트의 제목을 key로 사용하여 고유하게 구분
              className="w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800"
              onClick={() => onClickSelectedProject(project)} // 프로젝트 선택 시 onClickSelectedProject 함수 실행
            >
              {project.title} {/* 프로젝트 제목 출력 */}
            </button>
          );
        })}
      </ul>
    </aside>
  );
}

export default SideBar;
