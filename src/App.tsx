import React, { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { ModalProvider } from "react-modal-hook";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import useAuth from "./hooks/useAuth";
import { useUserQuery } from "./api/graphql/user/user";
import Spinner from "./shared/Spinner";
import { createCustomTheme } from "./theme";
import useSettings from "./hooks/useSettings";
import BackdropSpinner from "./shared/BackdropSpinner";

const AuthRoutes = lazy(() => import("./routes/AuthRoutes"));
const AppRoutes = lazy(() => import("./routes/AppRoutes"));

export const App = () => {
  const { isSignedIn, setIsSignedIn } = useAuth();
  const navigate = useNavigate();
  const { settings } = useSettings();

  const theme = createCustomTheme({
    theme: settings.theme,
    responsiveFontSizes: settings.responsiveFontSizes,
  });

  const { loading } = useUserQuery({
    onCompleted: () => {
      setIsSignedIn(true);
    },
    onError: () => {
      setIsSignedIn(false);
      navigate("/authorization");
    },
  });

  if (loading) return <BackdropSpinner />;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModalProvider rootComponent={TransitionGroup}>
          <Suspense fallback={<Spinner />}>
            {!isSignedIn ? <AuthRoutes /> : <AppRoutes />}
          </Suspense>
        </ModalProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
