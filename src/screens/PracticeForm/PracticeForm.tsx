import { useState } from "react";
import FormMain from "../../features/PracticeForm/models/FormMain/FormMain";
import FormResult from "../../features/PracticeForm/ui/FormResult/FormResult";
import ContainerLeft from "../../shared/ui/Containers/ContainerLeft/ContainerLeft";
import ContainerRight from "../../shared/ui/Containers/ContainerRight/ConteinerRight";

const PracticeForm: React.FC = () => {
  const [data, setData] = useState();

  return (
    <>
      <ContainerLeft>
        <FormMain setData={setData} />
      </ContainerLeft>
      <ContainerRight>
        <div>{data && <FormResult data={data} />}</div>
      </ContainerRight>
    </>
  );
};

export default PracticeForm;
