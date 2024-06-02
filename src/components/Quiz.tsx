import React, {
  useCallback,
  useState,
  useEffect,
  SetStateAction,
  useRef,
} from 'react';
import { ReactElement } from 'react';
import QUESTIONS from '../questions';
import quizCompletePng from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer';
import { AnswerStateEnum } from '../common/enums';

const TIMEOUT_TIME = 10000;

export default function Quiz(): ReactElement {
  const shuffledAnswers = useRef();
  const [answerState, setAnswerState] = useState<AnswerStateEnum>(
    AnswerStateEnum.UNKNOWN
  );
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // By the amount of questions answered we can figure out what active question is next.
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

  if (!shuffledAnswers.current) {
    // Shuffle the answers so that they are not in the same place (index 0) on each question
    // where the correct answer is.
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
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
      <div id="question">
        <QuestionTimer
          timeout={TIMEOUT_TIME}
          onTimeout={handleSkipAnswer}
          key={activeQuestionIndex}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
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
                  onClick={() => handleSelectAnswer(answer)}
                  className={styleToUse}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
