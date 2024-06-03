import React, { ReactElement } from 'react';
import quizCompletePng from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';

interface Props {
  usersAnswers: string[];
}

export default function Summary({
  usersAnswers,
}: Readonly<Props>): ReactElement {
  let numSkippedQuestions: number = 0;
  let numCorrectQuestions: number = 0;
  let numWrongQuestions: number = 0;

  usersAnswers.map((answer, index) => {
    if (QUESTIONS[index].answers[0] === answer) numCorrectQuestions++;
    else if (QUESTIONS[index].answers[0] !== answer && answer !== null)
      numWrongQuestions++;
    else if (answer === null) numSkippedQuestions++;
  });

  return (
    <div id="summary">
      <img src={quizCompletePng} alt="Quiz Complete Image" />
      <h2>Quiz is Complete</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{numSkippedQuestions}</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{numCorrectQuestions}</span>
          <span className="text">Correct</span>
        </p>
        <p>
          <span className="number">{numWrongQuestions}</span>
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
              </li>
            );
          })}
      </ol>
    </div>
  );
}
