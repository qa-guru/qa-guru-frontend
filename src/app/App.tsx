import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useUserQuery } from "../api/graphql/user/user";
import Spinner from "../shared/Spinner";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme/theme";
import { CssBaseline } from "@mui/material";

const AuthRoutes = lazy(() => import("../routes/AuthRoutes"));
const AppRoutes = lazy(() => import("../routes/AppRoutes"));

export const App = () => {
  const { isSignedIn, setIsSignedIn } = useAuth();
  let navigate = useNavigate();

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

  if (loading) {
    return <Spinner />;
  }

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
