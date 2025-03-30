import { useRef } from "react";

function CreateProject({ onClickSaveProject }) {
  // useRef로 각각의 입력 필드 값을 추적
  // useRef는 컴포넌트 리렌더링을 일으키지 않고 DOM 요소를 직접 참조할 수 있게 해준다.
  const projectTitleRef = useRef(""); // 프로젝트 제목을 추적하기 위한 ref
  const projectDescriptionRef = useRef(""); // 프로젝트 설명을 추적하기 위한 ref
  const projectDueDateRef = useRef(""); // 프로젝트 마감일을 추적하기 위한 ref

  // 'Save' 버튼 클릭 시 호출되는 함수
  function handleSaveClick() {
    // useRef에서 값을 추출하여 변수에 저장
    const title = projectTitleRef.current.value; // 프로젝트 제목 입력 값
    const description = projectDescriptionRef.current.value; // 프로젝트 설명 입력 값
    const dueDate = projectDueDateRef.current.value; // 프로젝트 마감일 입력 값

    // 부모 컴포넌트로 추출한 값을 전달
    // onClickSaveProject는 부모 컴포넌트에서 전달된 함수로, 해당 값을 처리한다.
    onClickSaveProject(title, description, dueDate);
  }

  return (
    <div className="w-[35rem] mt-16">
      {/* 폼의 UI */}
      <form className="mt-4 text-right">
        <menu className="flex items-center justify-end gap-4 my-4">
          <button className="text-stone-800 hover:text-stone-950">
            Cancel
          </button>
          {/* 'Save' 버튼: 사용자가 입력한 값들을 저장하는 버튼 */}
          <button
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            onClick={handleSaveClick} // 버튼 클릭 시 handleSaveClick 호출
            type="button" // form을 제출하지 않도록 type="button" 설정
          >
            Save
          </button>
        </menu>
      </form>

      {/* 프로젝트 제목 입력 필드 */}
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          TITLE
        </label>
        <input
          ref={projectTitleRef} // useRef로 제목 입력 필드 값 추적
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      </p>

      {/* 프로젝트 설명 입력 필드 */}
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          DESCRIPTION
        </label>
        <textarea
          ref={projectDescriptionRef} // useRef로 설명 입력 필드 값 추적
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      </p>

      {/* 프로젝트 마감일 입력 필드 */}
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          DUE DATE
        </label>
        <input
          ref={projectDueDateRef} // useRef로 마감일 입력 필드 값 추적
          type="date" // 날짜 입력 필드
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      </p>
    </div>
  );
}

export default CreateProject;
