import React, { ReactElement } from 'react';
import quizCompletePng from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';

interface Props {
  usersAnswers: string[];
}

export default function Summary({
  usersAnswers,
}: Readonly<Props>): ReactElement {
  const skippedAnswers = usersAnswers.filter((answer) => answer === null);
  const correctAnswers = usersAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  // TODO we could move this as a util function?
  const skippedAnswersPercentage = Math.round(
    (skippedAnswers.length / usersAnswers.length) * 100
  );
  const correctAnswersPercentage = Math.round(
    (correctAnswers.length / usersAnswers.length) * 100
  );
  const wrongAnswersPercentage =
    100 - skippedAnswersPercentage - correctAnswersPercentage;

  // Reloads the page to mock a "Play Again" feature
  function handlePlayAgain() {
    window.location.reload();
  }

  return (
    <div id="summary">
      <img src={quizCompletePng} alt="Quiz Complete Image" />
      <h2>Quiz is Complete</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersPercentage}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number correct">{correctAnswersPercentage}%</span>
          <span className="text">Correct</span>
        </p>
        <p>
          <span className="number wrong">{wrongAnswersPercentage}%</span>
          <span className="text">Incorrect</span>
        </p>
      </div>
      <ol>
        {usersAnswers &&
          usersAnswers.map((answer, index) => {
            let styleToUse = 'user-answer';

            if (QUESTIONS[index].answers[0] === answer)
              styleToUse = 'user-answer correct';
            else if (QUESTIONS[index].answers[0] !== answer && answer !== null)
              styleToUse = 'user-answer wrong';
            else if (answer === null) styleToUse = 'user-answer skipped';

            return (
              <li key={`${answer}${index}`}>
                <h3>{QUESTIONS[index].id}</h3>
                <p className="question">{QUESTIONS[index].text}</p>
                <p className={styleToUse}>
                  {answer ?? 'Woops! This one was skipped!'}
                </p>
                {styleToUse !== 'user-answer correct' && (
                  <>
                    <span>The correct answer was:</span>
                    <p className="user-answer">{QUESTIONS[index].answers[0]}</p>
                  </>
                )}
              </li>
            );
          })}
      </ol>
      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
}
