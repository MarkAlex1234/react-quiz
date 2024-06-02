import React from 'react';
import { ReactElement } from 'react';
import Answers from './Answers';
import QuestionTimer from './QuestionTimer';
import { TIMEOUT_TIME } from '../common/constants';
import { AnswerStateEnum } from '../common/enums';

interface Props {
  questionText: string;
  answers: string[];
  answerState: AnswerStateEnum;
  selectedAnswer: string | null;
  onSelect: (string) => void;
  onSkip: () => void;
}

export default function Question({
  questionText,
  answers,
  answerState,
  selectedAnswer,
  onSelect,
  onSkip,
}: Readonly<Props>): ReactElement {
  return (
    <div id="question">
      <QuestionTimer timeout={TIMEOUT_TIME} onTimeout={onSkip} />
      <h2>{questionText}</h2>
      <Answers
        selectedAnswer={selectedAnswer}
        answers={answers}
        answerState={answerState}
        onSelect={onSelect}
      />
    </div>
  );
}
