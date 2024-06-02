import React, { useCallback, useState } from 'react';
import { ReactElement } from 'react';
import QUESTIONS from '../questions';
import quizCompletePng from '../assets/quiz-complete.png';
import Question from './Question';

export default function Quiz(): ReactElement {
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // By the amount of questions answered we can figure out what active question is next.
  const activeQuestionIndex = userAnswers.length;
  const isQuizComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer: string | null) => {
    setSelectedAnswer(selectedAnswer);
    setUserAnswers((prevValue) => [...prevValue, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (isQuizComplete) {
    return (
      <div id="summary">
        <img src={quizCompletePng} alt="Quiz Complete Image" />
        <h2>Quiz is Complete</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        onSkip={handleSkipAnswer}
        onSelect={handleSelectAnswer}
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
      />
    </div>
  );
}
