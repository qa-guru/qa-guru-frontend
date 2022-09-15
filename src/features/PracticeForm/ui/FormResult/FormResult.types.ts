import { IFormAutoTestsInput } from "../../../AutoTestsGenerateForm/models/FormMain/FormMain.types";
import { IFormPracticeInput } from "../../models/FormMain/FormMain.types";

export interface IFormResult {
  data: IFormPracticeInput | IFormAutoTestsInput;
}
