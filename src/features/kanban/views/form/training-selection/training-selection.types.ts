import { Control } from "react-hook-form";
import { TechStack } from "../../../../../api/graphql/generated/graphql";
import { IFilterKanban } from "../form.types";

export interface ITrainingSelection {
  items:
    | Array<{
        __typename?: "TrainingDto";
        id: string;
        name: string;
        techStack: TechStack;
      } | null>
    | null
    | undefined;
  control: Control<IFilterKanban, unknown>;
}
