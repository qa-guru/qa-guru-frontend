import { Box, Typography } from "@mui/material";
import GetTrainingPurchases from "../../features/TrainingPurchase/models/GetTrainingPurchases/GetTrainingPurchases";

const Home = () => {
  return (
    <>
      <Box>
        <Typography variant="h4" component="h4" mb="20px">
          Мои курсы
        </Typography>
        <GetTrainingPurchases />
      </Box>
    </>
  );
};
export default Home;
