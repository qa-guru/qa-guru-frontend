import React from "react";
import WrapperForContainers from "../../shared/ui/WrapperForContainers/WrapperForContainers";
import ContainerLeft from "../../shared/ui/Containers/ContainerLeft/ContainerLeft";
import ContainerRight from "../../shared/ui/Containers/ContainerRight/ConteinerRight";
import CreateLecture from "../../features/Lecture/models/CreateLecture/CreateLecture";
import styles from "./Lecture.module.scss";
import { Typography } from "antd";

const { Title } = Typography;

const Lecture = () => (
  <WrapperForContainers>
    <ContainerLeft>
      <div className={styles.wrapper}>
        <Title className={styles.title}>Create Lecture</Title>
        <CreateLecture />
      </div>
    </ContainerLeft>
    <ContainerRight>
      <div>Hello</div>
    </ContainerRight>
  </WrapperForContainers>
);

export default Lecture;
