import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, useNavigate } from "react-router-dom";
import { usePersonQuery } from "../generated/graphql";
import useAuth from "../hooks/useAuth";
import AuthRotes from "../routes/AuthRoutes";
import Navbar from "../widgets/Navbar/Navbar";
import styles from "./App.module.scss";

export const App = () => {
  const { isSignedIn, setIsSignedIn } = useAuth();
  const { data } = usePersonQuery({
    onCompleted: () => {
      setIsSignedIn(true);
    },
  });

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div>
          <Suspense fallback={<span>Loading....</span>}>
            {!isSignedIn && <AuthRotes />}
            {/* {data.person.role === 'manager' && <ManagerRoutes />} */}
            {/* <OtherRoutes /> */}
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default App;
