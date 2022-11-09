import Profile from "../../features/Profile/models/Profile/Profile";
import ProfileEdit from "../../features/Profile/models/ProfileEdit/ProfileEdit";
import ContainerLeft from "../../shared/ui/Containers/ContainerLeft/ContainerLeft";
import ContainerRight from "../../shared/ui/Containers/ContainerRight/ConteinerRight";
import WrapperForContainers from "../../shared/ui/WrapperForContainers/WrapperForContainers";
import LayoutOnCenter from "../../shared/ui/LayoutOnCenter/LayoutOnCenter";
import styles from "./ProfileScreen.module.scss";

const ProfileScreen: React.FC = () => {
  return (
    <WrapperForContainers>
      <ContainerLeft>
        <LayoutOnCenter>
          <ProfileEdit />
        </LayoutOnCenter>
      </ContainerLeft>
      <ContainerRight>
        <LayoutOnCenter>
          <Profile />
        </LayoutOnCenter>
      </ContainerRight>
    </WrapperForContainers>
  );
};

export default ProfileScreen;
