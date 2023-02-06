import React from "react";
import { ReactComponent as Java } from "../../icons/java.svg";
import { ReactComponent as Gradle } from "../../icons/gradle.svg";
import { ReactComponent as JUnit5 } from "../../icons/junit5.svg";
import { ReactComponent as Idea } from "../../icons/idea.svg";
import { ReactComponent as Selenide } from "../../icons/selenide.svg";
import { Backdrop } from "@mui/material";
import styles from "./Spinner.module.scss";

const Spinner: React.FC = () => {
  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
      <div className={styles.loader}>
        <Java className={styles.box} />
        <Gradle className={styles.box} />
        <JUnit5 className={styles.box} />
        <Idea className={styles.box} />
        <Selenide className={styles.box} />
      </div>
    </Backdrop>
  );
};

export default Spinner;
