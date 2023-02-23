import { Typography } from "@mui/material";
import TrainingPurchases from "../features/Training/TrainingPurchases";
import React from "react";

const Home = () => {
  return (
    <>
      <Typography variant="h4" mb="20px">
        Мои курсы
      </Typography>
      <TrainingPurchases />
    </>
  );
};

export default Home;
