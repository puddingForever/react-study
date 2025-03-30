import { useRef } from "react";

// ProjectTask 컴포넌트 - 프로젝트의 작업 리스트를 관리하는 컴포넌트
function ProjectTask({ tasks, onClickAddTask, onClickClear }) {
  // 작업 입력 필드를 위한 useRef로 상태 관리
  const taskInputRef = useRef("");

  // 'Add Task' 버튼 클릭 시 실행되는 함수
  function handleAddTaskClick() {
    // 입력된 작업이 비어 있지 않으면 작업 추가
    const taskValue = taskInputRef.current.value.trim(); // useRef에서 값 추출

    if (taskValue !== "") {
      onClickAddTask(taskValue); // 상위 컴포넌트에 작업 추가 요청
      taskInputRef.current.value = ""; // 입력 필드 초기화
    }
  }

  return (
    <>
      {/* 'Tasks' 제목 */}
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>

      {/* 작업 입력 필드와 추가 버튼 */}
      <div className="flex items-center gap-4">
        {/* 입력 필드 */}
        <input
          ref={taskInputRef} // useRef로 입력 필드 값 추적
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        />
        {/* 추가 버튼 */}
        <button
          className="text-stone-700 hover:text-stone-950"
          onClick={handleAddTaskClick} // 클릭 시 작업 추가
        >
          Add Task
        </button>
      </div>

      {/* 작업이 없을 경우 보여지는 메시지 */}
      {tasks.length === 0 ? (
        <p className="text-stone-800 my-4">
          This Project does not have any task yet.
        </p>
      ) : (
        // 작업이 있을 경우, 작업 리스트 출력
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks
            .slice() // 배열을 복사하여 직접 수정하지 않도록 처리
            .reverse() // 최신 작업이 맨 위에 오도록 역순 정렬
            .map((task, index) => {
              return (
                <li key={index} className="flex justify-between my-4">
                  {/* 작업 이름 출력 */}
                  {task}
                  {/* 작업 삭제 버튼 */}
                  <button
                    className="text-stone-700 hover:text-red-500"
                    onClick={() => onClickClear(index)} // 작업 삭제 요청
                  >
                    Clear
                  </button>
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
}

export default ProjectTask;
