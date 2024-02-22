import { FC } from "react";
import { useUpdateUserMutation } from "api/graphql/generated/graphql";

import EditProfile from "../../views/edit-profile";

const UpdateProfileContainer: FC = () => {
  const [updateUser, { loading, error }] = useUpdateUserMutation({
    update: (cache, { data }) => {
      const updateUser = data?.updateUser;
      if (updateUser) {
        cache.modify({
          id: cache.identify(updateUser),
          fields: {
            input() {
              return updateUser;
            },
          },
        });
      }
    },
  });

  return <EditProfile updateUser={updateUser} />;
};

export default UpdateProfileContainer;
