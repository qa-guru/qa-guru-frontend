import React from "react";
import Profile from "./Profile";
import Spinner from "../../../shared/Spinner";
import NoDataErrorMessage from "../../../shared/NoDataErrorMessage";
import { useUserQuery } from "../../../api/graphql/generated/graphql";

const ProfileContainer: React.FC = () => {
  const { loading, data } = useUserQuery();

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <Profile data={data} />;
};

export default ProfileContainer;
