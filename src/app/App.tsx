import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../header/Navbar/Navbar";
import { useUserQuery } from "../api/query/user";
import Spinner from "../shared/ui/Spinner/Spinner";

const AuthRoutes = lazy(() => import("../routes/AuthRoutes"));
const AppRoutes = lazy(() => import("../routes/AppRoutes"));

export const App = () => {
  const { isSignedIn, setIsSignedIn } = useAuth();
  let navigate = useNavigate();

  const { data, loading } = useUserQuery({
    onCompleted: () => {
      setIsSignedIn(true);
      navigate("/");
    },
    onError: () => {
      setIsSignedIn(false);
      navigate("authorization");
    },
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {isSignedIn && <Navbar />}
      <main>
        <Suspense fallback={<Spinner />}>
          {!isSignedIn ? <AuthRoutes /> : <AppRoutes />}
        </Suspense>
      </main>
    </>
  );
};

export default App;
