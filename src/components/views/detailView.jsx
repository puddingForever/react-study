import React, { useRef } from 'react';
import Button from '../common/button';

const DetailView = ({ setRoute, project, setProjects }) => {
    const taskInputRef = useRef();
    const handleDelete = () => {
        setProjects((prevProjects) => prevProjects.filter((p) => p.id !== project.id));
        setRoute('home');
    };

    const handleSubmit = () => {
        const taskValue = taskInputRef.current.value;
        if (taskValue.trim()) {
            setProjects((prevProjects) =>
                prevProjects.map((p) => (p.id === project.id ? { ...p, tasks: [...p.tasks, taskValue] } : p))
            );
            taskInputRef.current.value = '';
        }
    };

    const handleDeleteTask = (index) => {
        setProjects((prevProjects) =>
            prevProjects.map((p) => {
                if (p.id === project.id) {
                    const newTasks = [...p.tasks];
                    newTasks.splice(index, 1);
                    return { ...p, tasks: newTasks };
                }
                return p;
            })
        );
    };
    return (
        <div className="relative p-5 max-w-3xl mx-auto bg-white">
            <div className="flex justify-end mb-5">
                <Button onClick={handleDelete} label={'Delete'} className={'bg-white hover:bg-gray-300 text-black'} />
            </div>

            <div className="mb-5">
                <h1 className="text-3xl font-bold mb-5">{project.title}</h1>
                <p className="text-gray-500 mb-5">
                    {new Date(project.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </p>
                <p className="text-gray-700 "> {project.description}</p>
            </div>

            <hr className="my-5 border-t-2 border-gray-500" />

            <h1 className="text-2xl font-bold mb-4">Tasks</h1>
            <form
                id="projectForm"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="flex mb-8"
            >
                <input
                    type="text"
                    ref={taskInputRef}
                    className="bg-gray-100 border-b-2 border-gray-300 px-3 py-2 focus:outline-none focus:border-b-2 focus:border-b-black transition-colors"
                />

                <Button label={'Add Task'} className={'bg-white text-black'} type="submit" />
            </form>

            <div className="space-y-3 bg-gray-100">
                {project.tasks &&
                    project.tasks.map((task, index) => (
                        <div key={index} className="flex items-center justify-between px-5 p-3 rounded">
                            <h1 className="text-lg font-semibold">{task}</h1>

                            <Button
                                label={'Clear'}
                                className={'bg-white hover:bg-gray-300 text-black'}
                                onClick={() => handleDeleteTask(index)}
                            />
                        </div>
                    ))}
                {(!project.tasks || project.tasks.length === 0) && <p>This project does not have any tasks yet.</p>}
            </div>
        </div>
    );
};

export default DetailView;
