import CreateHomework from "../../features/Homework/models/CreateHomework/CreateHomework";
import ContainerLeft from "../../shared/ui/Containers/ContainerLeft/ContainerLeft";
import ContainerRight from "../../shared/ui/Containers/ContainerRight/ConteinerRight";
import WrapperForContainers from "../../shared/ui/WrapperForContainers/WrapperForContainers";
import GetHomework from "../../features/Homework/models/GetHomework/GetHomework";
import { useState } from "react";

const Homework = () => {
  const [idHomework, setIdHomework] = useState("");

  return (
    <WrapperForContainers>
      <ContainerLeft>
        <CreateHomework setIdHomework={setIdHomework} />
      </ContainerLeft>
      <ContainerRight>
        <GetHomework idHomework={idHomework} />
      </ContainerRight>
    </WrapperForContainers>
  );
};

export default Homework;
