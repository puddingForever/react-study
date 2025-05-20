import ProgressBar from "./ProgressBar.jsx";

function Question({ question, time, isAnswered }) {
  return (
    <section id="question">
      <ProgressBar time={time} isAnswered={isAnswered} />
      <h2>{question}</h2>
    </section>
  );
}

export default Question;
