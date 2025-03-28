import Button from "../common/Button";

// 왼쪽의 프로젝트 목록 사이드바
const ProjectList = ({ projects, selectedProject, onAddProject, onSelectProject }) => {
  return (
    <div className="w-1/4 bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-8">YOUR PROJECTS</h1>
      <div className="mt-4">
        <Button variant="black" onClick={onAddProject}>
          + Add Project
        </Button>

        {projects.length > 0 && (
          <ul className="space-y-2">
            {projects.map((project) => (
              <li
                key={project.id}
                className={`p-2 hover:bg-gray-800 rounded cursor-pointer ${selectedProject && selectedProject.id === project.id ? 'bg-gray-700' : ''}`}
                onClick={() => onSelectProject(project)}
              >
                {project.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectList;