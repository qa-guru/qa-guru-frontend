import { IIcon } from "../page-scroll/page-scroll.types";
import { ImageDictionary } from "../../hooks/useLoadedImages";

export interface IIconsRenderer {
  icons: IIcon[];
  loadedIcons: ImageDictionary;
}
