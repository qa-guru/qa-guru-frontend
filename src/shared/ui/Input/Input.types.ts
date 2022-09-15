import { Control } from "react-hook-form";
import { IFormAutoTestsInput } from "../../../features/AutoTestsGenerateForm/models/FormMain/FormMain.types";
import { IFormPracticeInput } from "../../../features/PracticeForm/models/FormMain/FormMain.types";

type IFormInput = IFormPracticeInput & IFormAutoTestsInput;

export interface IFormInputProps {
  control: any;
  label?: string;
  placeholder?: string;
  content?: any;
  direction?: "horizontal" | "vertical";
  min?: number;
  max?: number;
  yupSync?: any;
  name: any;
  setValue?: any;
}
