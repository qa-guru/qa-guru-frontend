import React from "react";
import { Link } from "react-router-dom";
import { Box, CardActionArea, Paper, Typography } from "@mui/material";
import styles from "./TrainingPurchases.module.scss";
import { TrainingPurchasesQuery } from "../../../../generated/graphql";

interface ITrainingByUserId {
  data: TrainingPurchasesQuery;
}

const TrainingPurchases: React.FC<ITrainingByUserId> = ({ data }) => {
  return (
    <Box className={styles.box}>
      {data?.trainingPurchases?.map((item, index) => {
        return (
          <Link
            className={styles.link}
            to={`/training/${item?.trainingTariff?.training?.id}`}
            key={index}
          >
            <CardActionArea>
              <Paper className={styles.paper}>
                <Typography className={styles.title}>
                  {item?.trainingTariff.name}
                </Typography>
                <Typography className={styles.description}>
                  {item?.trainingTariff.description}
                </Typography>
              </Paper>
            </CardActionArea>
          </Link>
        );
      })}
    </Box>
  );
};

export default TrainingPurchases;
