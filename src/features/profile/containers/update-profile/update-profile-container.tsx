import { FC } from "react";
import { useUpdateUserMutation } from "api/graphql/generated/graphql";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import EditProfile from "../../views/edit-profile";

const UpdateProfileContainer: FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [updateUser] = useUpdateUserMutation({});

  return <EditProfile updateUser={updateUser} />;
};

export default UpdateProfileContainer;
