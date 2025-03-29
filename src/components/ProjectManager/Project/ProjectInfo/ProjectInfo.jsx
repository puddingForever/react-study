/**
 *  프로젝트 상세정보 
 *   @param {Object} project - 프로젝트 객체 (title, description, dueDate)
 *   @param {Function} onDeleteProject - 프로젝트 삭제 핸들러 
 */

import Button from "../../Button";

const ProjectInfo = ({project, onDeleteProject}) => {


    return (
        <>
          <div className="flex justify-between">
            <div className="font-bold text-4xl">{project.title}</div>
            <Button onClick={onDeleteProject} >Delete</Button>
          </div>
          <small className="text-gray-400">{project.dueDate}</small>
          <div className="border-b border-gray-200 pb-2">
           {project.description}
          </div>
        </>
    )
}

export default ProjectInfo;