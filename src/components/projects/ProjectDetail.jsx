import Button from "../common/Button";
import ProjectForm from "./ProjectForm";
import ProjectItem from "./ProjectItem";

// 기본화면
const defaultPage = (onCreateNew) => (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <div className="mb-4">
            <img src="/logo.png" alt="Clipboard" className="w-16 h-16" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">No Project Selected</h2>
        <p className="mb-8">Select a project or get started with a new one</p>
        <Button variant="black" onClick={onCreateNew} >
            Create new project
        </Button>
    </div>
)

// 오른쪽 프로젝트 정보를 출력하는 화면
const ProjectDetail = ({ selectedProject, showForm, onSave, onCancel, onDelete, onUpdateTasks, onCreateNew }) => {

    // 프로젝트가 있으면 프로젝트 정보, 없으면 기본 화면 출력
    const projectContent = selectedProject ? (
        <ProjectItem project={selectedProject} onDelete={onDelete} onUpdateTasks={onUpdateTasks} />
    ) : defaultPage(onCreateNew);

    return (
        <div className="w-3/4 bg-gray-100">
            {showForm ? (
                <ProjectForm
                    project={selectedProject}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            ) : projectContent}
        </div>
    );
};

export default ProjectDetail;