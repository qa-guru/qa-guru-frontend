import React from "react";
import { Link } from "react-router-dom";
import { CardActionArea, Grid, Paper, Typography } from "@mui/material";
import { ITrainings } from "./TrainingPurchases.types";

const TrainingPurchases: React.FC<ITrainings> = ({ data }) => {
  const { trainingPurchases } = data;

  return (
    <Grid container spacing={2} columns={{ xs: 6, md: 12 }}>
      {trainingPurchases?.map((item, index) => {
        return (
          <Grid item xs={6} key={index}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/training/${item?.trainingTariff?.training?.id}`}
            >
              <CardActionArea>
                <Paper sx={{ padding: "24px 24px 15px 24px" }}>
                  <Typography variant="h3">
                    {item?.trainingTariff?.training?.name}
                  </Typography>
                  <Typography
                    color="primary"
                    variant="h4"
                    mt="20px"
                    align="right"
                  >
                    Продолжить
                  </Typography>
                </Paper>
              </CardActionArea>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TrainingPurchases;
