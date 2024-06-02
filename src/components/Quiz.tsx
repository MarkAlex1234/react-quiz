import React, { useCallback, useState } from 'react';
import { ReactElement } from 'react';
import QUESTIONS from '../questions';
import quizCompletePng from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer';

const TIMEOUT_TIME = 10000;

export default function Quiz(): ReactElement {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  // By the amount of questions answers we can figure out what active question is next.
  const activeQuestionIndex = userAnswers.length;
  const isQuizComplete = activeQuestionIndex === QUESTIONS.length;

  if (isQuizComplete) {
    return (
      <div id="summary">
        <img src={quizCompletePng} alt="Quiz Complete Image" />
        <h2>Quiz is Complete</h2>
      </div>
    );
  }

  // We need to shuffle the answers so that they are not in the same place (index 0) on each question
  // which is the correct answer.
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  // useCallback handles a memoized version of the callback that only changes if one of the inputs has changed.
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevValue) => {
      return [...prevValue, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          timeout={TIMEOUT_TIME}
          onTimeout={handleSkipAnswer}
          key={activeQuestionIndex}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
