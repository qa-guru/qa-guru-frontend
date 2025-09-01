export interface QuestionForm {
  id?: string;
  text: string;
  answers: AnswerForm[];
}

export interface AnswerForm {
  id?: string;
  text: string;
  correct: boolean;
}
