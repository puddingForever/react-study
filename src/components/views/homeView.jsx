import writeImg from '../../assets/write.png';
import Button from '../common/button';

const HomeView = ({ setRoute }) => {
    function handleClick() {
        setRoute('addProject');
    }
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="mb-8">
                <img src={writeImg} alt="Write image" className="w-24 h-24 object-contain" />
            </div>
            <h2 className="text-2xl font-bold mb-3">No Project Selected</h2>
            <p className="text-gray-600 mb-6 max-w-md">Select a project or get started with a new one</p>
            <Button
                onClick={handleClick}
                label={'Create new Project'}
                className={'bg-black hover:bg-gray-800 text-white'}
            />
        </div>
    );
};

export default HomeView;
