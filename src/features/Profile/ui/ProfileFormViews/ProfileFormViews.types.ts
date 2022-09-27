import { Control } from "react-hook-form";
import { PersonInput } from "../../../../generated/graphql";

export interface IProfileFormViews {
  control: Control<PersonInput, object>;
}
