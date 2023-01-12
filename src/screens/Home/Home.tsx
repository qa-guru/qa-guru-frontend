import { Typography } from "@mui/material";
import { useUserQuery } from "../../generated/graphql";
import Spinner from "../../shared/ui/Spinner/Spinner";
import GetTrainingPurchasesByUserId from "../../features/Training/models/GetTrainingPurchasesByUserId/GetTrainingPurchasesByUserId";
import LectureHomework from "../../features/Lecture/models/LectureHomework";

const Home = () => {
  const { loading, data } = useUserQuery();

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <LectureHomework />
      <Typography align="center" variant="h3" component="h3">
        Hello <span style={{ color: "red" }}>{data?.user?.email}</span> in
        QA.GURU Application
      </Typography>
      <div>
        <Typography variant="h4" component="h4">
          Ваши курсы:
        </Typography>
        <GetTrainingPurchasesByUserId idUser={data?.user?.id} />
      </div>
    </>
  );
};
export default Home;
