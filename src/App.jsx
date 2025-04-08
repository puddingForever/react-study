function App() {
/*
퀴즈 앱

1. 요구사항
타이머
- 지정한 시간만큼 게이지 바가 감소
- 답을 고르면 노란색으로 변경되어 빠르게 감소
- 정답을 체크한 후 원래의 색으로 돌아와 빠르게 감소

문제
- 문제와 보기 4개
- hover시 보기가 보라색으로 변경
- 답을 고르면 해당 보기만 노란색으로 변경
- 정답 체크 후 맞으면 초록색, 틀리면 빨간색으로 변경

결과
- 문제를 다 풀면 결과 페이지로 이동
- 모든 문제에 대해 SKIPPED, ANSWERED CORRECTLY, ANSWERED INCORRECTLY를 %로 제공
- 하단에는 1번부터 문제와 내가 선택한 답을 보여줌. 맞은 답은 초록색, 틀린 답은 빨간색으로 출력

2. 로직
지정한 수 만큼 문제를 풀면 게임 종료
문제당 풀이시간, 정답체크 시간, 정답 확인 시간을 제공
게임 종료 후 결과 페이지로 이동
문제에는 스킵이 없는데, 결과에 SKIPPED가 있는걸로 보아 풀지 않으면 스킵으로 처리되는듯

3. 구조 설계 - 임시
App : context로 퀴즈, 퀴즈 상태 관리. 현재 화면 결정
Header : 헤더
LastTry : 이전 시도에 대한 정보
Quiz : 질문과 답변 목록 관리
- Question : 현재 질문. 진행 바도 포함되는듯
-- Answers : 답변 목록
- ProgressBar : 진행 바
Summary : 결과 페이지
- SummaryStats : 결과 통계
QuizContext : 퀴즈 상태 관리
useQuiz : 퀴즈 관련 로직
questions : 퀴즈 목록
*/
}

export default App;
