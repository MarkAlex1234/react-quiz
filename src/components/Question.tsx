import React, { useState } from 'react';
import { ReactElement } from 'react';
import Answers from './Answers';
import QuestionTimer from './QuestionTimer';
import { TIMEOUT_TIME } from '../common/constants';
import { AnswerStateEnum } from '../common/enums';
import { AnswerInterface } from '../common/interfaces';
import QUESTIONS from '../questions';

interface Props {
  onSkip: () => void;
  onSelect: (string) => void;
  questionIndex: number;
}

export default function Question({
  onSkip,
  onSelect,
  questionIndex,
}: Readonly<Props>): ReactElement {
  const [answer, setAnswer] = useState<AnswerInterface>({
    selectedAnswer: '',
    isCorrect: undefined,
  });

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: undefined,
    });

    const timer = setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[questionIndex].answers[0] === answer,
      });

      const secondtTimer = setTimeout(() => {
        onSelect(answer);
        answerState = AnswerStateEnum.UNKNOWN;
      }, 2000);
    }, 1000);
  }

  // Determine if the answer is correct or not.
  let answerState = AnswerStateEnum.UNKNOWN;
  if (answer.selectedAnswer && answer.isCorrect !== undefined) {
    answerState = answer.isCorrect
      ? AnswerStateEnum.CORRECT
      : AnswerStateEnum.WRONG;
  } else if (answer.selectedAnswer) {
    answerState = AnswerStateEnum.ANSWERED;
  }

  return (
    <div id="question">
      <QuestionTimer timeout={TIMEOUT_TIME} onTimeout={onSkip} />
      <h2>{QUESTIONS[questionIndex].text}</h2>
      <Answers
        selectedAnswer={answer.selectedAnswer}
        answers={QUESTIONS[questionIndex].answers}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
