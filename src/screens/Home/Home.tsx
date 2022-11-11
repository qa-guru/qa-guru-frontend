import { Typography } from "@mui/material";
import { useUserQuery } from "../../generated/graphql";
import Spinner from "../../shared/ui/Spinner/Spinner";
import GetTrainingByUserId from "../../features/Training/models/GetTrainingByUserId/GetTrainingByUserId";

const Home = () => {
  const { loading, data } = useUserQuery();

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography align="center" variant="h3" component="h3">
        Hello <span style={{ color: "red" }}>{data?.user?.email}</span> in
        QA.GURU Application
      </Typography>
      <div>
        <Typography variant="h4" component="h4">
          Ваши курсы:
        </Typography>
        <GetTrainingByUserId idUser={data?.user?.id} />
      </div>
    </>
  );
};
export default Home;
