import React from "react";
import { Link } from "react-router-dom";
import { CardActionArea, Grid, Paper, Typography } from "@mui/material";
import { ITrainings } from "./TrainingPurchases.types";

const style = {
  paper: { padding: { xs: "15px", md: "20px" } },
};

const TrainingPurchases: React.FC<ITrainings> = ({ data }) => {
  const { trainingPurchases } = data;

  return (
    <>
      <Typography variant="h4" mb="20px">
        Мои курсы
      </Typography>
      <Grid container spacing={2} columns={{ xs: 6, md: 12 }}>
        {trainingPurchases?.map((item, index) => {
          const { id, name } = item!.trainingTariff.training!;

          return (
            <Grid item xs={6} key={index}>
              <Link style={{ textDecoration: "none" }} to={`/training/${id}`}>
                <CardActionArea>
                  <Paper sx={style.paper}>
                    <Typography variant="h5">{name}</Typography>
                    <Typography
                      color="primary"
                      variant="subtitle2"
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
    </>
  );
};

export default TrainingPurchases;
