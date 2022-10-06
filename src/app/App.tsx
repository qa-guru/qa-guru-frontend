import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { usePersonQuery } from "../generated/graphql";
import useAuth from "../hooks/useAuth";
import Navbar from "../navbar/Navbar/Navbar";
import Spinner from "../shared/ui/Spinner/Spinner";

const AuthRoutes = lazy(() => import("../routes/AuthRoutes"));
const AppRoutes = lazy(() => import("../routes/AppRoutes"));

export const App = () => {
  const { isSignedIn, setIsSignedIn } = useAuth();
  let navigate = useNavigate();
  const { data } = usePersonQuery({
    onCompleted: () => {
      setIsSignedIn(true);
      navigate("/");
    },
    onError: () => {
      setIsSignedIn(false);
      navigate("/authorization");
    },
  });

  return (
    <>
      {isSignedIn && <Navbar />}
      <main>
        <Suspense fallback={<Spinner />}>
          {!isSignedIn ? <AuthRoutes /> : <AppRoutes />}
          {/* {data.person.role === 'manager' && <ManagerRoutes />} */}
        </Suspense>
      </main>
    </>
  );
};

export default App;
