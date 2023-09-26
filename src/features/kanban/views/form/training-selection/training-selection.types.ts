import { Control } from "react-hook-form";
import { TechStack } from "../../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/api/graphql/generated/graphql";
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
