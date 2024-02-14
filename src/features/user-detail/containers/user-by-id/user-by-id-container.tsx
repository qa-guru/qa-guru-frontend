import {
  useProfileByIdQuery,
  useUserByIdQuery,
} from "api/graphql/generated/graphql";
import { FC } from "react";
import { useParams } from "react-router-dom";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import Spinner from "shared/components/spinner";

import UserDetail from "../../views/user-detail";

const UserByIdContainer: FC = () => {
  const { userId } = useParams();

  const { loading: loadingProfileById, data: dataProfileById } =
    useProfileByIdQuery({
      variables: {
        id: userId,
      },
    });

  const { data, loading } = useUserByIdQuery({
    variables: {
      id: userId,
    },
  });

  if (loading || loadingProfileById) return <Spinner />;
  if (!data || !dataProfileById) return <NoDataErrorMessage />;

  return <UserDetail data={data} dataProfileById={dataProfileById} />;
};

export default UserByIdContainer;
