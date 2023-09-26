import React from "react";
import { IMentorsContainer } from "./mentors-container.types";
import {
  Order,
  useMentorsQuery,
  UserSortField,
} from "../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/api/graphql/generated/graphql";
import MentorSelection from "../../views/form/mentor-selection";

const MentorsContainer: React.FC<IMentorsContainer> = ({ control }) => {
  const { data } = useMentorsQuery({
    variables: {
      offset: 0,
      limit: 100,
      sort: {
        field: UserSortField.LastName,
        order: Order.Asc,
      },
    },
  });

  return <MentorSelection data={data!} control={control} />;
};

export default MentorsContainer;
