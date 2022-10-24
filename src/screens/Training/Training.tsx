import React, { useState } from "react";
import WrapperForContainers from "../../shared/ui/WrapperForContainers/WrapperForContainers";
import ContainerLeft from "../../shared/ui/Containers/ContainerLeft/ContainerLeft";
import ContainerRight from "../../shared/ui/Containers/ContainerRight/ConteinerRight";
import CreateTraining from "../../features/Training/models/CreateTraining/CreateTraining";
import GetTraining from "../../features/Training/models/GetTraining/GetTraining";

const Training = () => {
  const [idTraining, setIdTraining] = useState("");

  return (
    <WrapperForContainers>
      <ContainerLeft>
        <CreateTraining setIdTraining={setIdTraining} />
      </ContainerLeft>
      <ContainerRight>
        <GetTraining idTraining={idTraining} />
      </ContainerRight>
    </WrapperForContainers>
  );
};

export default Training;
