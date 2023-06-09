// eslint-disable-next-line import/named
import { PaletteMode } from "@mui/material";
import { THEMES } from "./constans";
import { lightPalette } from "./colors";

export const themesOptions = {
  [THEMES.LIGHT]: {
    palette: {
      ...lightPalette,
      mode: "light" as PaletteMode,
    },
  },
};


export default themesOptions;
