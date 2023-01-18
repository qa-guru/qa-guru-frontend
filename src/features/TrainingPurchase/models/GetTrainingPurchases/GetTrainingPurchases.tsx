import React from "react";
import { IGetTrainingByUserId } from "./GetTrainingPurchases.types";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import { Link } from "react-router-dom";
import { Box, CardActionArea, Paper, Typography } from "@mui/material";
import { useTrainingPurchasesQuery } from "../../../../api/graphql/trainingPurchase/trainingPurchases";
import styles from "./GetTrainingPurchases.module.scss";

const GetTrainingPurchases: React.FC<IGetTrainingByUserId> = () => {
  const { data, loading } = useTrainingPurchasesQuery();

  if (loading) {
    return <Spinner />;
  }

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

export default GetTrainingPurchases;
