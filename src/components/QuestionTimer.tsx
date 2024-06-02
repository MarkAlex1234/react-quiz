import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react';

interface Props {
  timeout: number;
  onTimeout: () => void;
}

export default function QuestionTimer({
  timeout,
  onTimeout,
}: Readonly<Props>): ReactElement {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevValue) => prevValue - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeout} />;
}