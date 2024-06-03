import { ImageDictionary } from "../../hooks/useLoadedImages";

export interface IStep {
  title: string;
  src: string;
}
export interface ISteps {
  steps: IStep[][];
  activePage: number;
  activeStep: number;
  loadedIcons: ImageDictionary;
}
