import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import { usePersonQuery } from "../../../../api/query/person";
import styles from "./Profile.module.scss";

const Profile = () => {
  const { data, error } = usePersonQuery({
    onError: () => {
      console.log(error);
    },
  });

  return (
    <>
      <Avatar size={150} icon={<UserOutlined />} />
      <div className={styles.wrapp}>
        <Typography></Typography>
        <Typography>{data?.person?.firstName}</Typography>
        <Typography>{data?.person?.lastName}</Typography>
        <Typography>{data?.person?.middleName}</Typography>
        <Typography>{data?.person?.phoneNumber}</Typography>
      </div>
    </>
  );
};

export default Profile;
