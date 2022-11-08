import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Spinner.module.scss";
import LayoutOnCenter from "../LayoutOnCenter/LayoutOnCenter";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <CircularProgress size={100} />
    </div>
  );
};

export default Spinner;
