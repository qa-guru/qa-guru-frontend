/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import { IFormResult } from "./FormResult.types";
const { Text } = Typography;
import styles from "./FormResult.module.scss";

const AutoTestsResult: React.FC<IFormResult> = ({ data }) => {
  const arrayData: any[] = Object.entries(data);

  const [linesShown, setLinesShown] = useState(0);

  useEffect(() => {
    if (linesShown < arrayData.length) {
      setTimeout(() => setLinesShown(linesShown + 1), 1);
    }
  }, [linesShown]);

  const generateSingleKeys = () => {
    return arrayData.map((key, index) =>
      index <= linesShown ? (
        <p className={styles.keys} key={key}>
          {key[0]}
        </p>
      ) : null
    );
  };

  const generateSingleValues = () => {
    return arrayData.map((value, index) =>
      index <= linesShown ? (
        <p className={styles.keys} key={value}>
          {Array.isArray(value[1])
            ? value[1].join(", ")
            : value[0] === "birthDate"
            ? value[1].toLocaleString()
            : value[0] === "file"
            ? JSON.stringify(value[1].name)
            : value[1]}
        </p>
      ) : null
    );
  };

  return (
    <div className={styles.wrapper}>
      <Text className={styles.title}>Thanks for submitting the form</Text>

      <div className={styles.result}>
        <div className={styles.result__keys}>{generateSingleKeys()}</div>

        <div className={styles.result__values}>{generateSingleValues()}</div>
      </div>
    </div>
  );
};

export default AutoTestsResult;
