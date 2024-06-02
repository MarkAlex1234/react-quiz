import React, { useRef } from 'react';
import { ReactElement } from 'react';
import { AnswerStateEnum } from '../common/enums';

interface Props {
  answers: string[];
  answerState: AnswerStateEnum;
  selectedAnswer: string | null;
  onSelect: (string) => void;
}

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}: Readonly<Props>): ReactElement {
  const shuffledAnswers = useRef<any[]>();

  if (!shuffledAnswers.current) {
    // Shuffle the answers so that they are not in the same place (index 0) on each question
    // where the correct answer is.
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        let styleToUse = '';

        if (
          answerState === AnswerStateEnum.ANSWERED &&
          selectedAnswer === answer
        ) {
          styleToUse = 'selected';
        }

        if (
          (answerState === AnswerStateEnum.CORRECT ||
            answerState === AnswerStateEnum.WRONG) &&
          selectedAnswer === answer
        ) {
          styleToUse = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={styleToUse}
              disabled={answerState !== AnswerStateEnum.UNKNOWN}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
