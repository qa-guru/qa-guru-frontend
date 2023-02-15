import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useUserQuery } from "../api/graphql/user/user";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Spinner from "../shared/Spinner";
import { createCustomTheme } from "../theme";
import useSettings from "../hooks/useSettings";

const AuthRoutes = lazy(() => import("../routes/AuthRoutes"));
const AppRoutes = lazy(() => import("../routes/AppRoutes"));

export const App = () => {
  const { isSignedIn, setIsSignedIn } = useAuth();
  let navigate = useNavigate();
  const { settings } = useSettings();

  const theme = createCustomTheme({
    theme: settings.theme,
    responsiveFontSizes: settings.responsiveFontSizes,
  });

  const { loading } = useUserQuery({
    onCompleted: () => {
      setIsSignedIn(true);
      navigate("/");
    },
    onError: () => {
      setIsSignedIn(false);
      navigate("/authorization");
    },
  });

  if (loading) return <Spinner />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<Spinner />}>
        {!isSignedIn ? <AuthRoutes /> : <AppRoutes />}
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
