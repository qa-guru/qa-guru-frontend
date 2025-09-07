export interface TestQuestion {
  id: string;
  text: string;
}

export interface TestAnswer {
  id: string;
  text: string;
  correct: boolean;
  testQuestion: TestQuestion;
}

export interface UserAnswer {
  questionId: string;
  answerIds: string[];
}
