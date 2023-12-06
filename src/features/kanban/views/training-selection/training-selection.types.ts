import { Control } from "react-hook-form";
import { TechStack } from "api/graphql/generated/graphql";
import { IFilterKanban } from "../form/form.types";

export interface ITrainingSelection {
  items?: Array<{
    id: string;
    name: string;
    techStack: TechStack;
  } | null> | null;
  control: Control<IFilterKanban, unknown>;
}
