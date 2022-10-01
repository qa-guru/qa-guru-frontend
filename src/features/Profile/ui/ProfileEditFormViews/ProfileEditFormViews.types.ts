import { Control } from "react-hook-form";
import { PersonInput } from "../../../../generated/graphql";

export interface IProfileEditFormViews {
  control: Control<PersonInput, object>;
}
