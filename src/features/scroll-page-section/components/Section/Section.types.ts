import { ISection, TypeScroll } from "../PageScroll/PageScroll.types";

export interface ISectionProp {
  sections: ISection[];
  scrollType: TypeScroll;
  onSlideChange: (index: number) => void;
  activeSection: number;
}
