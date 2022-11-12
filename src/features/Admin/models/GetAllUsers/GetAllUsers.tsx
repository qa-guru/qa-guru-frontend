import React from "react";
import { useUsersQuery } from "../../../../api/graphql/user/users";
import DeleteUser from "../DeleteUser/DeleteUser";
import UpdateRole from "../UpdateRole/UpdateRole";
import styles from "./GetAllUsers.module.scss";

const GetAllUsers: React.FC = () => {
  const { data } = useUsersQuery();

  return (
    <div className={styles.wrapp}>
      {data?.users?.items?.map((item) => {
        return (
          <div className={styles.wrapper} key={item?.id}>
            <div>{item?.email}</div>
            <div className={styles.roles}>
              {item?.roles}
              <UpdateRole id={item?.id} />
            </div>
            <DeleteUser id={item?.id} />
          </div>
        );
      })}
    </div>
  );
};

export default GetAllUsers;
