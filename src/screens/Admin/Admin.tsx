import GetAllUsers from "../../features/Admin/models/GetAllUsers/GetAllUsers";
import styles from "./Admin.module.scss";

const Admin = () => {
  return (
    <div className={styles.wrapper}>
      <GetAllUsers />
    </div>
  );
};

export default Admin;
