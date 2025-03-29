import Button from '../common/button';

const Sidebar = ({ route, setRoute, projects, setProjects }) => {
    function handleClick() {
        setRoute('addProject');
    }
    function handleProjectClick(id) {
        setRoute(`projectDetail_${id}`);
        setProjects((prevProjects) =>
            prevProjects.map((p) => (p.id === id ? { ...p, isActive: 'true' } : { ...p, isActive: 'false' }))
        );
    }
    function isSelectedProject(id) {
        if (route.includes('projectDetail')) {
            return route === `projectDetail_${id}`;
        }
        return false;
    }

    return (
        <div className="w-1/3 bg-black p-1 border-r border-gray-700 p-10 pt-30">
            <h1 className="text-xl font-semibold mb-4 text-white">Your Project</h1>
            <div className="mt-4 mb-10">
                <Button
                    onClick={handleClick}
                    label={'+ Add Project'}
                    className={'bg-gray-900 hover:bg-gray-800 text-white'}
                />
            </div>
            {projects.map((project) => (
                <div
                    key={project.id}
                    className={`mb-4 p-2 cursor-pointer ${isSelectedProject(project.id) && 'bg-gray-900'}`}
                    onClick={() => handleProjectClick(project.id)}
                >
                    <h2 className="text-lg  text-white">{project.title}</h2>
                </div>
            ))}
        </div>
    );
};
export default Sidebar;
