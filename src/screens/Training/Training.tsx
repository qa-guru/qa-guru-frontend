import React from "react";
import WrapperForContainers from "../../shared/ui/WrapperForContainers/WrapperForContainers";
import ContainerLeft from "../../shared/ui/Containers/ContainerLeft/ContainerLeft";
import ContainerRight from "../../shared/ui/Containers/ContainerRight/ConteinerRight";
import CreateLecture from "../../features/Lecture/models/CreateLecture/CreateLecture";
import CreateTraining from "../../features/Training/models/CreateTraining/CreateTraining";
import { Typography } from "antd";
import styles from "./Training.module.scss";

const { Title } = Typography;

const Training = () => (
  <WrapperForContainers>
    <ContainerLeft>
      <div className={styles.wrapper}>
        <Title className={styles.title}>Create Training</Title>
        <CreateTraining />
      </div>
    </ContainerLeft>
    <ContainerRight>
      <div>Hello</div>
    </ContainerRight>
  </WrapperForContainers>
);

export default Training;
