import React, { useCallback, useState } from 'react';
import { ReactElement } from 'react';
import QUESTIONS from '../questions';
import quizCompletePng from '../assets/quiz-complete.png';
import { AnswerStateEnum } from '../common/enums';
import Question from './Question';

export default function Quiz(): ReactElement {
  const [answerState, setAnswerState] = useState<AnswerStateEnum>(
    AnswerStateEnum.UNKNOWN
  );
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // By the amount of questions answered we can figure out what active question is next.
  const activeQuestionIndex =
    answerState === AnswerStateEnum.UNKNOWN
      ? userAnswers.length
      : userAnswers.length - 1;
  const isQuizComplete = activeQuestionIndex === QUESTIONS.length;

  if (isQuizComplete) {
    return (
      <div id="summary">
        <img src={quizCompletePng} alt="Quiz Complete Image" />
        <h2>Quiz is Complete</h2>
      </div>
    );
  }

  const handleSelectAnswer = useCallback(
    (selectedAnswer: string | null) => {
      setSelectedAnswer(selectedAnswer);
      setAnswerState(AnswerStateEnum.ANSWERED);

      setUserAnswers((prevValue) => [...prevValue, selectedAnswer]);

      // Determine if the answer was correct or wrong after 1 second of selection
      const timer = setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState(AnswerStateEnum.CORRECT);
        } else {
          setAnswerState(AnswerStateEnum.WRONG);
        }

        // After 2 seconds set the answer state back to unknown
        const secondTimer = setTimeout(() => {
          setAnswerState(AnswerStateEnum.UNKNOWN);
          setSelectedAnswer(null);
        }, 2000);

        return () => {
          clearTimeout(secondTimer);
        };
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  return (
    <div id="quiz">
      <Question
        questionText={QUESTIONS[activeQuestionIndex].text}
        onSelect={handleSelectAnswer}
        onSkip={handleSkipAnswer}
        answerState={answerState}
        selectedAnswer={selectedAnswer}
        answers={QUESTIONS[activeQuestionIndex].answers}
        key={activeQuestionIndex}
      />
    </div>
  );
}
