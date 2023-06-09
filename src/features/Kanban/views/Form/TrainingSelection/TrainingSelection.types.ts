import { Control } from "react-hook-form";
import { TechStack } from "../../../../../api/graphql/generated/graphql";
import { IFilterKanban } from "../Form.types";

export interface ITrainingSelection<T extends IFilterKanban> {
  items:
    | Array<{
        __typename?: "TrainingDto";
        id: string;
        name: string;
        techStack: TechStack;
      } | null>
    | null
    | undefined;
  control: Control<T>;
}
