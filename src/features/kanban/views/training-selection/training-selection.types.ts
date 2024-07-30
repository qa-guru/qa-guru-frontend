import { Control } from "react-hook-form";

import { TechStack, Maybe } from "api/graphql/generated/graphql";

import { IFilterKanban } from "../form/form.types";

export interface ITrainingSelection {
  items?: Maybe<
    Array<
      Maybe<{
        id: string;
        name: string;
        techStack: TechStack;
      }>
    >
  >;
  control: Control<IFilterKanban, unknown>;
}
