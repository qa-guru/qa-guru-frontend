import React from "react";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import { List, ListItem, Typography } from "@mui/material";
import { useTrainingPurchasesByUserIdQuery } from "../../../../api/graphql/training/trainingLectures";
import { useNavigate, useParams } from "react-router-dom";

const GetLessonsByTraining: React.FC = () => {
  const { trainingId } = useParams();
  const navigate = useNavigate();

  const { data, loading } = useTrainingPurchasesByUserIdQuery({
    variables: { id: trainingId! },
    skip: !trainingId,
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <List>
      {data?.trainingLectures?.map((item, index) => {
        return (
          <ListItem
            key={index}
            onClick={() =>
              navigate(`/training/${trainingId}/${item?.lecture?.id}`)
            }
          >
            <Typography>{item?.lecture?.subject}</Typography>
          </ListItem>
        );
      })}
    </List>
  );
};

export default GetLessonsByTraining;
