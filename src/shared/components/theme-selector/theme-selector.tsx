import { FC } from "react";
import { useReactiveVar } from "@apollo/client";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { lightThemeVar } from "cache";
import { useSettings } from "shared/hooks";

import { StyledIconButton } from "./theme-selector.styled";

const ThemeSelector: FC = () => {
  const { toggleTheme } = useSettings();
  const lightTheme = useReactiveVar(lightThemeVar);

  return (
    <StyledIconButton onClick={toggleTheme} disableRipple>
      {lightTheme ? (
        <Brightness7 color="primary" />
      ) : (
        <Brightness4 color="primary" />
      )}
    </StyledIconButton>
  );
};

export default ThemeSelector;
