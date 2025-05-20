/**
 * 프로젝트 추가 모달
 *   @param {useRef} ref - useRef 객체 
 *   @param {Function} onAddProject - 프로젝트 추가 핸들러
 */
import { useImperativeHandle, useState } from 'react';
import Button from './Button';
import { createPortal } from 'react-dom';

const CreateProjectModal = ( {onAddProject, ref}  ) => {
  // 모달상태 
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 프로젝트 데이터 
  const [project, setProject] = useState({
    title : '',
    description : '',
    dueDate : '',
  })

   // 프로젝트 리셋함수 
   const resetProject = () => setProject({
    title : '',
    description : '',
    dueDate : '',
  })
  // 프로젝트 저장 
  const handleSaveProject = () => {
    const newProject = { title : project.title, description : project.description, dueDate : project.dueDate}
    onAddProject(newProject)
    resetProject();
    setIsModalOpen(false);
  };
  // 입력값 변경 
  const handleChange = (e) => {
    const {name, value} = e.target;
    setProject({
      ...project,
     [name] : value
    })
  }

  // 모달 열고 닫기 
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);
 
  // 외부에서 모달 조작  
  useImperativeHandle(ref, () => {
    return {
      open: handleOpenModal,
      close : handleCloseModal
    }
  })
  // 모달이 닫혀있으면 랜더링제외 
  if(!isModalOpen) return null;

  return createPortal(
    <> 
        <dialog
          className="p-32 left-1/2 top-1/2 -translate-x-1/4 -translate-y-1/2 w-1/2  flex flex-col gap-3 bg-gray-100 rounded-2xl border-black border-2"
        >
          {/* 버튼영역 */}
          <div className="flex gap-2 justify-end">
            <Button
              className={'bg-white text-black'}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button className={'bg-black text-white'} onClick={handleSaveProject}>
              Save
            </Button>
          </div>
        {/* 입력폼 */}
          <div>
            <h2 className="uppercase">Title</h2>
            <input className="bg-gray-200 w-full" name="title" value={project.title} onChange={handleChange} />
          </div>
          <div>
            <h2 className="uppercase">Description</h2>
            <textarea className="bg-gray-200 w-full resize-none h-20" name="description" value={project.description} onChange={handleChange}/>
          </div>
          <div>
            <h2 className="uppercase">Due Date</h2>
            <input type="date" className="w-full bg-gray-200" name="dueDate" value={project.dueDate} onChange={handleChange}/>
          </div>
        </dialog>
    </>, document.getElementById("modal")
  );
};

export default CreateProjectModal;