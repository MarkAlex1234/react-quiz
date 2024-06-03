import React, { ReactElement } from 'react';
import quizCompletePng from '../assets/quiz-complete.png';

export default function Summary(): ReactElement {
  return (
    <div id="summary">
      <img src={quizCompletePng} alt="Quiz Complete Image" />
      <h2>Quiz is Complete</h2>
      <div id="summary-stats">
        <p>
          <span className="number">TODO</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">TODO</span>
          <span className="text">Correct</span>
        </p>
        <p>
          <span className="number">TODO</span>
          <span className="text">Incorrect</span>
        </p>
      </div>
      <ol>
        <li>
          <h3>2</h3>
          <p className="question">Question Text</p>
          <p className="user-answer">User Answer</p>
        </li>
      </ol>
    </div>
  );
}
