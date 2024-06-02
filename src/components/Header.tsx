import { ReactElement } from 'react';
import logoImg from '../assets/quiz-logo.png';
import React from 'react';

export default function Header(): ReactElement {
  return (
    <header>
      <img src={logoImg} alt="Quiz Logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
}
