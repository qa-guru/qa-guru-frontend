import React from "react";
import { IMentorsContainer } from "./MentorsContainer.types";
import {
  Order,
  useMentorsQuery,
  UserSortField,
} from "../../../../api/graphql/generated/graphql";
import MentorSelection from "../../views/Form/MentorSelection";

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
