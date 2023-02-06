import React from "react";
import Profile from "./Profile";
import { useUserQuery } from "../../../api/graphql/user/user";
import Spinner from "../../../shared/Spinner";

const ProfileContainer: React.FC = () => {
  const { loading, data } = useUserQuery();

  if (loading && !data) return <Spinner />;

  return <Profile data={data!} />;
};

export default ProfileContainer;
