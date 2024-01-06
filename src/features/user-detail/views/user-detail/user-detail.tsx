import { UserByIdQuery } from "api/graphql/generated/graphql";
import { FC } from "react";

interface IUserDetail {
  data: UserByIdQuery;
}

const UserDetail: FC<IUserDetail> = ({ data }) => {
  const { firstName, lastName } = data.userById!;

  return (
    <>
      <div>{firstName}</div>
      <div>{lastName}</div>
    </>
  );
};

export default UserDetail;
