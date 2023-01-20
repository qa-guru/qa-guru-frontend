import { Typography } from "@mui/material";
import { TrainingPurchases } from "../../features/Training";

const Home = () => {
  return (
    <>
      <Typography variant="h2" mb="20px">
        Мои курсы
      </Typography>
      <TrainingPurchases />
    </>
  );
};

export default Home;
