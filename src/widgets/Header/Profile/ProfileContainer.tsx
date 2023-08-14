import React from "react";
import Profile from "./Profile";
import Spinner from "../../../shared/components/Spinner";
import NoDataErrorMessage from "../../../shared/components/NoDataErrorMessage";
import { useUserQuery } from "../../../api/graphql/generated/graphql";

const ProfileContainer: React.FC = () => {
  const { loading, data } = useUserQuery();

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <Profile data={data} />;
};

export default ProfileContainer;
