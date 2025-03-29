import AddProjectView from './addProjectView';
import DetailView from './detailView';
import HomeView from './homeView';

const View = ({ route, setRoute, projects, setProjects }) => {
    function findProject() {
        if (!route.includes('projectDetail')) return null;
        const projectId = route.split('_')[1];
        return projects.find((project) => project.id === parseInt(projectId));
    }

    return (
        <div className="w-2/3 bg-white p-5">
            {route === 'home' ? (
                <HomeView setRoute={setRoute} />
            ) : route === 'addProject' ? (
                <AddProjectView setRoute={setRoute} setProjects={setProjects} />
            ) : route.includes('projectDetail') ? (
                <DetailView setRoute={setRoute} project={findProject()} setProjects={setProjects} />
            ) : (
                <HomeView setRoute={setRoute} />
            )}
        </div>
    );
};
export default View;
