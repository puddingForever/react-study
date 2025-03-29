import { useRef } from 'react';
import Button from '../common/button';

const AddProjectView = ({ setRoute, setProjects }) => {
    const titleInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const dateInputRef = useRef(null);

    const handleCancel = () => {
        setRoute('home');
    };

    const handleSave = (e) => {
        e.preventDefault();
        setProjects((prevProjects) => [
            ...prevProjects,
            {
                id: prevProjects.length + 1,
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                date: document.getElementById('date').value,
                tasks: [],
            },
        ]);
        setRoute('home');
    };

    return (
        <div className="relative h-full p-8">
            <div className="absolute top-4 right-8 flex space-x-4">
                <Button
                    onClick={handleCancel}
                    label={'Cancel'}
                    className={'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}
                />
                <Button onClick={handleSave} label={'Save'} className={'bg-black text-white hover:bg-gray-800'} />
            </div>
            <div className="mt-15 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
                <form id="projectForm" onSubmit={handleSave} className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            ref={titleInputRef}
                            className="bg-gray-100 border-b-2 border-gray-300 px-3 py-2 focus:outline-none focus:border-b-2 focus:border-b-black transition-colors"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows="4"
                            ref={descriptionInputRef}
                            className="bg-gray-100 border-b-2 border-gray-300 px-3 py-2 focus:outline-none focus:border-b-2 focus:border-b-black transition-colors"
                        ></textarea>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-1">
                            Due Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            ref={dateInputRef}
                            className="bg-gray-100 border-b-2 border-gray-300 px-3 py-2 focus:outline-none focus:border-b-2 focus:border-b-black transition-colors"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjectView;
