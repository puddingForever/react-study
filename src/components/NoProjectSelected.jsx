import React from "react";
import noProjects from "../assets/no-projects.png";

function NoProjectSelected({ onClickCreatingProject }) {
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        className="w-16 h-16 object-contain mx-auto"
        src={noProjects}
        alt="NoProjects"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No Project Selected
      </h2>
      <p className="text-stone-400 mb-9">
        Select a project or getStarted with a new one
      </p>
      <button
        className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
        onClick={onClickCreatingProject}
      >
        Create new project
      </button>
    </div>
  );
}

export default NoProjectSelected;
