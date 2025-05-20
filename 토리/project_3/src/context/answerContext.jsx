import { createContext } from "react";

export const AnswerContext = createContext({
  answers: [],
  activeIndex: "",
  answerState: "",
  handleGetSelectAnswer: () => {},
});
