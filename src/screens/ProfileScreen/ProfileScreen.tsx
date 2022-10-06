import Profile from "../../features/Profile/models/Profile/Profile";
import ProfileEdit from "../../features/Profile/models/ProfileEdit/ProfileEdit";
import ContainerLeft from "../../shared/ui/Containers/ContainerLeft/ContainerLeft";
import ContainerRight from "../../shared/ui/Containers/ContainerRight/ConteinerRight";
import WrapperForContainers from "../../shared/ui/WrapperForContainers/WrapperForContainers";
import styles from "./ProfileScreen.module.scss";

const ProfileScreen: React.FC = () => {
  return (
    <WrapperForContainers>
      <ContainerLeft>
        <div className={styles.wrapper}>
          <ProfileEdit />
        </div>
      </ContainerLeft>
      <ContainerRight>
        <div className={styles.wrapper}>
          <Profile />
        </div>
      </ContainerRight>
    </WrapperForContainers>
  );
};

export default ProfileScreen;
