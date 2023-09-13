import React from "react";
import Profile from "./profile";
import Spinner from "../../../shared/components/spinner";
import NoDataErrorMessage from "../../../shared/components/no-data-error-message";
import { useUserQuery } from "../../../api/graphql/generated/graphql";

const ProfileContainer: React.FC = () => {
  const { loading, data } = useUserQuery();

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <Profile data={data} />;
};

export default ProfileContainer;
