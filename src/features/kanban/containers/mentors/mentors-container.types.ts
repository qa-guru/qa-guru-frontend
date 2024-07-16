import { Control } from "react-hook-form";

import { IFilterKanban } from "../../views/form/form.types";

export interface IMentorsContainer {
  control: Control<IFilterKanban, unknown>;
}
