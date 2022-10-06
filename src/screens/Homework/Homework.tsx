import { Typography } from "antd";
import CreateHomework from "../../features/Homework/models/CreateHomework/CreateHomework";
import ContainerLeft from "../../shared/ui/Containers/ContainerLeft/ContainerLeft";
import ContainerRight from "../../shared/ui/Containers/ContainerRight/ConteinerRight";
import WrapperForContainers from "../../shared/ui/WrapperForContainers/WrapperForContainers";
import styles from "./Homework.module.scss";

const { Title } = Typography;

const Homework = () => {
  return (
    <WrapperForContainers>
      <ContainerLeft>
        <div className={styles.wrapper}>
          <Title className={styles.title}>Create Homework</Title>
          <CreateHomework />
        </div>
      </ContainerLeft>
      <ContainerRight>
        <div>Hello</div>
      </ContainerRight>
    </WrapperForContainers>
  );
};

export default Homework;
