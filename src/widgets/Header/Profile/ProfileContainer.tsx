import React from "react";
import Profile from "./Profile";
import { useUserQuery } from "../../../api/graphql/user/user";
import Spinner from "../../../shared/Spinner";
import NoDataErrorMessage from "../../../shared/NoDataErrorMessage";

const ProfileContainer: React.FC = () => {
  const { loading, data } = useUserQuery();

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <Profile data={data} />;
};

export default ProfileContainer;
