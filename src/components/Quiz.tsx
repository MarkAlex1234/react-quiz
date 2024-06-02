import React, { useState } from 'react';
import { ReactElement } from 'react';
import QUESTIONS from '../questions';

export default function Quiz(): ReactElement {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  // By the amount of questions answers we can figure out what active question is next.
  const activeQuestionIndex = userAnswers.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevValue) => {
      return [...prevValue, selectedAnswer];
    });
  }

  return (
    <div id="question">
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <ul id="answers">
        {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
          <li key={answer} className="answer">
            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
