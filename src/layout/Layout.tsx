import React from "react";
import Header from "../header/Header/Header";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className={styles.layout}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
