import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { usePersonQuery } from "../generated/graphql";
import useAuth from "../hooks/useAuth";
import Navbar from "../navbar/Navbar/Navbar";
import styles from "./App.module.scss";

const AuthRotes = lazy(() => import("../routes/AuthRoutes"));
const OtherRoutes = lazy(() => import("../routes/OtherRoutes"));

export const App = () => {
  const { isSignedIn, setIsSignedIn } = useAuth();
  let navigate = useNavigate();
  const { data } = usePersonQuery({
    onCompleted: () => {
      setIsSignedIn(true);
    },
    onError: () => {
      setIsSignedIn(false);
      navigate("/authorization");
    },
  });

  return (
    <>
      {isSignedIn && <Navbar />}
      <main className={styles.main}>
        <Suspense fallback={<span>Loading....</span>}>
          {!isSignedIn && <AuthRotes />}
          {isSignedIn && <OtherRoutes />}
          {/* {data.person.role === 'manager' && <ManagerRoutes />} */}
        </Suspense>
      </main>
    </>
  );
};

export default App;
