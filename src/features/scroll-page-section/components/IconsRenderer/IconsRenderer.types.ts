import { IIcon } from "../PageScroll/PageScroll.types";
import { ImageDictionary } from "../../hooks/useLoadedImages";

export interface IIconsRenderer {
  icons: IIcon[];
  loadedIcons: ImageDictionary;
}
