import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, useNavigate } from "react-router-dom";
import { usePersonQuery } from "../generated/graphql";
import useAuth from "../hooks/useAuth";
import AuthRotes from "../routes/AuthRoutes";
import Navbar from "../widgets/Navbar/Navbar";
import styles from "./App.module.scss";

export const App = () => {
  const { isSignedIn } = useAuth();
  const { data } = usePersonQuery();

  // const AuthRotes = lazy(() => import("../routes/AuthRoutes"));
  // const OtherRoutes = lazy(() => import("./OtherRoutes"));

  useEffect(() => {
    console.log("init");
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div>
          <Suspense fallback={<span>Loading....</span>}>
            {!isSignedIn && <AuthRotes />}
            {/* {isSignedIn === false && <AuthRotes />} */}
            {/* <OtherRoutes /> */}
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default App;
