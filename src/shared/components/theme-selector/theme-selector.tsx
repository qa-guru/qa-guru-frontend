import { FC } from "react";
import { useSettings } from "shared/hooks";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { StyledIconButton } from "./theme-selector.styled";

const ThemeSelector: FC = () => {
  const { settings, toggleTheme } = useSettings();

  return (
    <StyledIconButton onClick={toggleTheme} disableRipple>
      {settings.theme === "light" ? (
        <Brightness7 color="primary" />
      ) : (
        <Brightness4 color="primary" />
      )}
    </StyledIconButton>
  );
};

export default ThemeSelector;
