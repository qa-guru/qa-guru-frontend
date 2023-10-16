import { cleanup, render } from "@testing-library/react";
import { ApolloProvider } from "@apollo/client";
import { ReactNode, ReactElement, FC } from "react";
import { SnackbarProvider } from "notistack";
import "../i18n/config";
import { TransitionGroup } from "react-transition-group";
import { ModalProvider } from "react-modal-hook";
import { ThemeProvider } from "@mui/material/styles";
import { client } from "api";
import { createCustomTheme } from "theme";
import useSettings from "../shared/hooks/use-settings";

interface WrapperProps {
  children: ReactNode;
}

afterEach(() => {
  cleanup();
});

const customRender = (ui: ReactElement, options = {}) => {
  const Wrapper: FC<WrapperProps> = ({ children }) => {
    const { settings } = useSettings();
    const theme = createCustomTheme({
      theme: settings.theme,
      responsiveFontSizes: settings.responsiveFontSizes,
    });

    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            variant="error"
            autoHideDuration={1500}
            maxSnack={1}
          >
            <ModalProvider rootComponent={TransitionGroup}>
              {children}
            </ModalProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export { customRender as render };
