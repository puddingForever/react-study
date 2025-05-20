/**
 * 프로젝트 없을 때 디폴트페이지
 * @param {Function} onOpenModal - 모달창 여는 함수 
 */

import Button from '../Button';

const ProjectNotFound = ({ onOpenModal }) => {
  return (
    <div className="flex flex-col align-middle justify-center gap-6">
      <h1>No Project Selected</h1>
      <p>Select a project or get started with a new one</p>
      <Button className={'bg-black text-gray-400'} onClick={onOpenModal}>
        Create new Project
      </Button>
    </div>
  );
};

export default ProjectNotFound;