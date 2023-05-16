import React, { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { ModalProvider } from "react-modal-hook";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import useAuth from "./features/Authorization/hooks/useAuth";
import { useUserQuery } from "./api/graphql/user/user";
import Spinner from "./shared/Spinner";
import { createCustomTheme } from "./theme";
import useSettings from "./hooks/useSettings";

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

  const { loading, data } = useUserQuery({
    onCompleted: () => {
      setIsSignedIn(true);
    },
    onError: () => {
      setIsSignedIn(false);
      navigate("/authorization");
    },
  });

  if (loading) return <Spinner />;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModalProvider rootComponent={TransitionGroup}>
          <Suspense fallback={<Spinner />}>
            {!isSignedIn ? (
              <AuthRoutes />
            ) : (
              <AppRoutes userRoles={data?.user?.roles!} />
            )}
          </Suspense>
        </ModalProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
