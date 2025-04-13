import { createContext, useContext, useReducer, useState } from 'react';

const DUMMY_QUESTIONS = [
    {
        id: 'q1',
        text: '리액트(React)는 어떤 종류의 라이브러리인가요?',
        answers: [
            { id: 'a1', text: 'UI JS 라이브러리' },
            { id: 'a2', text: '서버 사이드 렌더링 라이브러리' },
            { id: 'a3', text: '데이터베이스 관리 라이브러리' },
            { id: 'a4', text: '애니메이션 라이브러리' },
        ],
        correctAnswerId: 'a1',
    },
    {
        id: 'q2',
        text: 'React Hook은 무엇인가요?',
        answers: [
            { id: 'a1', text: 'React 컴포넌트의 생명주기 메서드' },
            { id: 'a2', text: '함수형 컴포넌트에서 상태와 기타 React 기능을 사용하기 위한 함수' },
            { id: 'a3', text: 'React에서 이벤트 처리하는 방식' },
            { id: 'a4', text: 'React 컴포넌트 스타일링 방법' },
        ],
        correctAnswerId: 'a2',
    },
    {
        id: 'q3',
        text: 'useEffect Hook은 언제 실행되나요?',
        answers: [
            { id: 'a1', text: '컴포넌트가 마운트될 때만' },
            { id: 'a2', text: '컴포넌트가 언마운트될 때만' },
            { id: 'a3', text: '상태가 업데이트될 때만' },
            { id: 'a4', text: '의존성 배열의 값이 변경될 때' },
        ],
        correctAnswerId: 'a4',
    },
    {
        id: 'q4',
        text: 'React에서 상태(state)는 무엇을 의미하나요?',
        answers: [
            { id: 'a1', text: '컴포넌트의 데이터' },
            { id: 'a2', text: '컴포넌트의 스타일' },
            { id: 'a3', text: '컴포넌트의 생명주기' },
            { id: 'a4', text: '컴포넌트의 이벤트' },
        ],
        correctAnswerId: 'a1',
    },
    {
        id: 'q5',
        text: 'useState Hook은 무엇을 반환하나요?',
        answers: [
            { id: 'a1', text: '상태와 상태를 업데이트하는 함수' },
            { id: 'a2', text: '상태와 컴포넌트의 props' },
            { id: 'a3', text: '상태와 컴포넌트의 생명주기 메서드' },
            { id: 'a4', text: '상태와 컴포넌트의 이벤트 핸들러' },
        ],
        correctAnswerId: 'a1',
    },
];

const QuizContext = createContext({
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    isCompleted: false,
    countQuestionFail: 0, // 한 질문의 실패 횟수
    answerQuestion: () => {},
    goToNextQuestion: () => {},
    restartQuiz: () => {},
});

// 퀴즈 상태 관리
function quizReducer(state, action) {
    switch (action.type) {
        case 'ANSWER_QUESTION': {
            const { questionId, answerId } = action.payload;
            const question = state.questions.find((q) => q.id === questionId);
            const isCorrectAnswer = question.correctAnswerId === answerId;

            const nextIndex = state.currentQuestionIndex + 1;
            const isCompleted = nextIndex >= state.questions.length;
            // console.log('상태:', state.currentQuestionIndex, state.countQuestionFail);
            // 정답을 못맞추고 3회 미만으로 틀린 경우
            if (!isCorrectAnswer && state.countQuestionFail < 3) {
                // console.log('정답을 못맞추고 3회 미만으로 틀린 경우');
                return {
                    ...state,
                    answers: {
                        ...state.answers,
                        [questionId]: answerId,
                    },
                    countQuestionFail: state.countQuestionFail + 1,
                };
            }
            // 정답을 못맞추고 3회 이상 틀린 경우 다음 문제로 이동
            else if (!isCorrectAnswer && state.countQuestionFail >= 3) {
                // console.log('정답을 못맞추고 3회 이상 틀린 경우 다음 문제로 이동');
                return {
                    ...state,
                    currentQuestionIndex: isCompleted ? state.currentQuestionIndex : nextIndex,
                    isCompleted: isCompleted,
                    answers: {
                        ...state.answers,
                        [questionId]: answerId,
                    },

                    countQuestionFail: 0,
                    isCompleted: isCompleted,
                };
            }
            // 정답을 맞추었지만 1번이라도 틀린 경우
            else if (isCorrectAnswer && state.countQuestionFail > 0) {
                // console.log('정답을 맞추었지만 1번이라도 틀린 경우');
                return {
                    ...state,
                    currentQuestionIndex: isCompleted ? state.currentQuestionIndex : nextIndex,
                    isCompleted: isCompleted,
                    answers: {
                        ...state.answers,
                        [questionId]: answerId,
                    },

                    countQuestionFail: 0,
                };
            }
            // 정답을 맞추었고 틀린 적이 없는 경
            else {
                // console.log('정답을 맞추었고 틀린 적이 없는 경우');
                return {
                    ...state,
                    currentQuestionIndex: isCompleted ? state.currentQuestionIndex : nextIndex,
                    isCompleted: isCompleted,
                    answers: {
                        ...state.answers,
                        [questionId]: answerId,
                    },

                    countQuestionFail: 0,
                };
            }
        }
        case 'ANSWER_QUESTION_FAIL': {
            return {
                ...state,
                countQuestionFail: state.countQuestionFail + 1,
            };
        }

        case 'NEXT_QUESTION': {
            // 다음 질문으로 이동 또는 퀴즈 완료 처리
            const nextIndex = state.currentQuestionIndex + 1;
            const isCompleted = nextIndex >= state.questions.length;

            return {
                ...state,
                // currentQuestionIndex: isCompleted ? state.currentQuestionIndex : nextIndex,
                // isCompleted: isCompleted,
                countQuestionFail: 0,
            };
        }

        case 'RESTART_QUIZ':
            return {
                ...state,
                currentQuestionIndex: 0,
                answers: {},
                isCompleted: false,
                countQuestionFail: 0,
            };

        default:
            return state;
    }
}

export function QuizProvider({ children }) {
    const [quizState, dispatch] = useReducer(quizReducer, {
        questions: DUMMY_QUESTIONS,
        currentQuestionIndex: 0,
        answers: {},

        isCompleted: false,
        countQuestionFail: 0,
    });

    // 현재 질문
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

    // 답변 제출 처리
    function handleAnswerQuestion(questionId, answerId) {
        dispatch({
            type: 'ANSWER_QUESTION',
            payload: { questionId, answerId },
        });
    }

    // 다음 질문으로 이동
    function handleNextQuestion() {
        dispatch({ type: 'NEXT_QUESTION' });
    }

    // 퀴즈 재시작
    function handleRestartQuiz() {
        dispatch({ type: 'RESTART_QUIZ' });
    }

    const ctxValue = {
        questions: quizState.questions,
        currentQuestion,
        currentQuestionIndex: quizState.currentQuestionIndex,
        answers: quizState.answers,
        isCompleted: quizState.isCompleted,
        countQuestionFail: quizState.countQuestionFail,
        answerQuestion: handleAnswerQuestion,
        goToNextQuestion: handleNextQuestion,
        restartQuiz: handleRestartQuiz,
    };
    return <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
    const quizContext = useContext(QuizContext);

    return quizContext;
}
