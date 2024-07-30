import { FC } from "react";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { useSettings } from "shared/hooks";

import { StyledIconButton } from "./theme-selector.styled";

const ThemeSelector: FC = () => {
  const { settings, toggleTheme } = useSettings();
  const lightTheme = settings.theme === "light";

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
