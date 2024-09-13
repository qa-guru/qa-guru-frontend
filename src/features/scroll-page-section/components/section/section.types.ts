import { ISection, TypeScroll } from "../page-scroll/page-scroll.types";

export interface ISectionProp {
  sections: ISection[];
  scrollType: TypeScroll;
  onSlideChange: (index: number) => void;
  activeSection: number;
}
