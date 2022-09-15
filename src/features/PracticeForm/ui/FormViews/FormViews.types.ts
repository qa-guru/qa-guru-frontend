import { Control, UseFormSetValue } from "react-hook-form";
import { IFormPracticeInput } from "../../models/FormMain/FormMain.types";

export interface IFormViewsProps {
  control: Control<IFormPracticeInput, object>;
  setValue: UseFormSetValue<IFormPracticeInput>;
  yupSync: any;
}
