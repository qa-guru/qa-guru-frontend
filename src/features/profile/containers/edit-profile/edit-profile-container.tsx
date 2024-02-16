import { FC } from "react";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useUserQuery } from "api/graphql/generated/graphql";

import EditProfile from "../../views/edit-profile";

const EditProfileContainer: FC = () => {
  const { loading, data } = useUserQuery();

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <EditProfile user={data.user} />;
};

export default EditProfileContainer;
