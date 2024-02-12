import {
  useProfileQuery,
  useUserByIdQuery,
} from "api/graphql/generated/graphql";
import { FC } from "react";
import { useParams } from "react-router-dom";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import Spinner from "shared/components/spinner";

import UserInfo from "../../../profile/views/user-info";

const UserByIdContainer: FC = () => {
  const { userId } = useParams();

  const { data, loading } = useUserByIdQuery({
    variables: {
      id: userId,
    },
  });
  const { loading: loadingProfile, data: dataProfile } = useProfileQuery();

  if (loading || loadingProfile) return <Spinner />;
  if (!data || !dataProfile) return <NoDataErrorMessage />;

  const adaptedData = {
    user: data.userById,
  };

  return <UserInfo data={adaptedData} dataProfile={dataProfile} />;
};

export default UserByIdContainer;
