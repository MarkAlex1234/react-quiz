import React, { useCallback, useState, ReactElement } from 'react';
import QUESTIONS from '../questions';
import Question from './Question';
import Summary from './Summary';

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
    return <Summary usersAnswers={userAnswers} />;
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
