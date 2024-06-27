import { FC } from "react";
import {
  LectureSortField,
  Order,
  useLecturesQuery,
} from "api/graphql/generated/graphql";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";

import TableColumns from "../../views/table-columns-lectures";

interface ISelectLectureContainer {
  lectureIds?: string[];
  trainingId?: string;
}

const SelectLectureContainer: FC<ISelectLectureContainer> = ({
  lectureIds,
  trainingId,
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
  });

  if (loading) return <AppSpinner />;
  if (!data) return <NoDataErrorMessage />;

  return (
    <TableColumns
      data={data}
      fetchMore={fetchMore}
      lectureIds={lectureIds}
      trainingId={trainingId}
    />
  );
};

export default SelectLectureContainer;
