/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IFormPracticeInput {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  birthDate: string;
  subjects: string[];
  hobbies: string[];
  stateCity: string[];
  slider: number;
  address: string;
  language: string;
  file: any;
}

export interface IFormMainProps {
  setData: any;
}
