import { FC } from "react";
import {
  Order,
  UserSortField,
  useMentorsQuery,
} from "api/graphql/generated/graphql";

import { IMentorsContainer } from "./mentors-container.types";
import MentorSelection from "../../views/mentor-selection";
import { STANDARD_QUERY_DEFAULTS } from "../../constants";

const MentorsContainer: FC<IMentorsContainer> = ({ control }) => {
  const { data, loading } = useMentorsQuery({
    variables: {
      offset: STANDARD_QUERY_DEFAULTS.OFFSET,
      limit: STANDARD_QUERY_DEFAULTS.LIMIT,
      sort: {
        field: UserSortField.Email,
        order: Order.Desc,
      },
    },
  });

  return <MentorSelection loading={loading} data={data} control={control} />;
};

export default MentorsContainer;
