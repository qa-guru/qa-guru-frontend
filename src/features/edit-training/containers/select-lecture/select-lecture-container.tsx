import { FC } from "react";

import {
  LectureSortField,
  Order,
  useLecturesQuery,
} from "api/graphql/generated/graphql";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { FETCH_POLICY } from "shared/constants";

import TableColumns from "../../views/table-columns-lectures";

interface ISelectLectureContainer {
  lectureIds?: string[];
}

const SelectLectureContainer: FC<ISelectLectureContainer> = ({
  lectureIds,
}) => {
  const { data, loading, fetchMore } = useLecturesQuery({
    variables: {
      offset: 0,
      limit: 30,
      sort: {
        field: LectureSortField.CreationDate,
        order: Order.Asc,
      },
    },
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
  });

  if (loading) return <AppSpinner />;
  if (!data) return <NoDataErrorMessage />;

  return (
    <TableColumns data={data} fetchMore={fetchMore} lectureIds={lectureIds} />
  );
};

export default SelectLectureContainer;
