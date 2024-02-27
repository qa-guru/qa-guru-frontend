import { FC } from "react";
import { useUpdateUserMutation } from "api/graphql/generated/graphql";

import EditProfile from "../../views/edit-profile";

const UpdateProfileContainer: FC = () => {
  const [updateUser] = useUpdateUserMutation({});

  return <EditProfile updateUser={updateUser} />;
};

export default UpdateProfileContainer;
