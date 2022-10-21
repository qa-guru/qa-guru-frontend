import React, { useState } from "react";
import WrapperForContainers from "../../shared/ui/WrapperForContainers/WrapperForContainers";
import ContainerLeft from "../../shared/ui/Containers/ContainerLeft/ContainerLeft";
import ContainerRight from "../../shared/ui/Containers/ContainerRight/ConteinerRight";
import CreateLecture from "../../features/Lecture/models/CreateLecture/CreateLecture";
import GetLecture from "../../features/Lecture/models/GetLecture/GetLecture";

const Lecture = () => {
  const [idLecture, setIdLecture] = useState("");

  return (
    <WrapperForContainers>
      <ContainerLeft>
        <CreateLecture setIdLecture={setIdLecture} />
      </ContainerLeft>
      <ContainerRight>
        <GetLecture idLecture={idLecture} />
      </ContainerRight>
    </WrapperForContainers>
  );
};

export default Lecture;
