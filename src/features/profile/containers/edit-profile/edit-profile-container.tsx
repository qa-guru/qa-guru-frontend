import { FC } from "react";

import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import {
  useUpdateUserMutation,
  useUserQuery,
} from "api/graphql/generated/graphql";

import EditProfile from "../../views/edit-profile";

const EditProfileContainer: FC = () => {
  const { data, loading: loadingUser } = useUserQuery();
  const [updateUser, { loading: loadingUpdateUser }] = useUpdateUserMutation();

  if (loadingUser || loadingUpdateUser) return <AppSpinner />;
  if (!data) return <NoDataErrorMessage />;

  return <EditProfile user={data.user} updateUser={updateUser} />;
};

export default EditProfileContainer;
