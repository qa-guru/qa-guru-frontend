import { FC } from "react";
import {
  Order,
  useMentorsQuery,
  UserSortField,
} from "api/graphql/generated/graphql";
import { IMentorsContainer } from "./mentors-container.types";
import MentorSelection from "../../views/form/mentor-selection";
import { STANDARD_QUERY_DEFAULTS } from "../../constants";
import NoDataErrorMessage from "../../../../shared/components/no-data-error-message";

const MentorsContainer: FC<IMentorsContainer> = ({ control }) => {
  const { data } = useMentorsQuery({
    variables: {
      offset: STANDARD_QUERY_DEFAULTS.OFFSET,
      limit: STANDARD_QUERY_DEFAULTS.LIMIT,
      sort: {
        field: UserSortField.LastName,
        order: Order.Asc,
      },
    },
  });

  if (!data) return <NoDataErrorMessage />;

  return <MentorSelection data={data} control={control} />;
};

export default MentorsContainer;
