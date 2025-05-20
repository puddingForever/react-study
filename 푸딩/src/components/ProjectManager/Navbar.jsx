/**
 * 사이드메뉴 
 * @param {Function} onOpenModal - 프로젝트 모달추가 함수 (+Add Project 버튼 )
 * @param {Function} onOpenProject - 특정 프로젝트를 열기 위한 함수
 * @param {Array} projectList - 사용자의 프로젝트 목록
 */
import Button from "./Button";

const NavBar = ({ onOpenModal, onOpenProject , projectList }) => {


    return (  
        <div className="p-16 bg-black rounded-tr-4xl mt-12 col-span-1">
            <h2 className="mb-8 font-bold uppercase text-2xl text-stone-200">
            YOUR PROJECTS
            </h2>
            <Button onClick={onOpenModal} className={'bg-gray-600 text-white'}>
            + Add Project
            </Button>
            <div className="mt-12 text-2xl text-gray-400">
            {
                projectList.map((project) => (
                    <div key={project.id} className="hover:text-white cursor-pointer" onClick={() => onOpenProject(project)}>{project.title}</div>
                ))
            }
        </div>
    </div>
    )
}

export default NavBar;