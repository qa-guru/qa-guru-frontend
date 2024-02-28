import { FC } from "react";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import {
  useUpdateUserMutation,
  useUserQuery,
} from "api/graphql/generated/graphql";

import EditProfile from "../../views/edit-profile";

const EditProfileContainer: FC = () => {
  const { data, loading: loadingUser } = useUserQuery();
  const [updateUser, { loading: loadingUpdateUser }] = useUpdateUserMutation();

  if (loadingUser || loadingUpdateUser) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <EditProfile user={data.user} updateUser={updateUser} />;
};

export default EditProfileContainer;
