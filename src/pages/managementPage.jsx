import { useState } from 'react';
import Sidebar from '../components/sideBar';
import View from '../components/views';

const ManagementPage = () => {
    const [projects, setProjects] = useState([]);
    const [route, setRoute] = useState('home');

    return (
        <div className="flex w-full h-screen">
            <Sidebar route={route} setRoute={setRoute} projects={projects} setProjects={setProjects} />
            <View route={route} setRoute={setRoute} projects={projects} setProjects={setProjects} />
        </div>
    );
};

export default ManagementPage;
