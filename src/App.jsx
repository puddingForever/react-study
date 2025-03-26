function App() {
  /*
  리액트 프로젝트 관리 앱
  
  1. 요구사항
  프로젝트 관리 기능:
  - 새 프로젝트 생성 (Add Project)
  - 프로젝트 정보: 프로젝트명, 프로젝트 설명, Due Date
  - 프로젝트 삭제 기능
  
  
  태스크 관리 기능:
  - 프로젝트별 태스크 추가 (Add Task)
  - 태스크 삭제 기능 (Clear)
  - 태스크 목록 출력
  
  2. 구조 설계
  - App
  - ProjectList : 프로젝트 목록
  - ProjectForm : 프로젝트 추가 폼
  - ProjectItem : 프로젝트
  - TaskList : 태스크 목록
  - TaskItem : 태스크
  - Button : 버튼
  - Input : 입력
  */
  return (
    <>
      <h1 className="my-8 text-center text-5xl font-bold">Hello World</h1>
    </>
  );
}

export default App;
