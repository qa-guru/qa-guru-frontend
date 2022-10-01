import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import Profile from "../../features/Profile/models/Profile/Profile";
import ProfileEdit from "../../features/Profile/models/ProfileEdit/ProfileEdit";
import styles from "./ProfileScreen.module.scss";

const ProfileScreen: React.FC = () => {
  const [profileEdit, setProfileEdit] = useState(false);

  const onChangeProfileEdit = () => {
    setProfileEdit(true);
  };

  return (
    <div className={styles.wrapper}>
      <EditOutlined onClick={onChangeProfileEdit} className={styles.edit} />
      {profileEdit ? <ProfileEdit /> : <Profile />}
    </div>
  );
};

export default ProfileScreen;
