import Lessons from "../../features/KanbanBoard/models/Lessons/Lessons";
import ContainerLeft from "../../shared/ui/Containers/ContainerLeft/ContainerLeft";
import ContainerRight from "../../shared/ui/Containers/ContainerRight/ConteinerRight";
import Tasks from "../../features/KanbanBoard/models/Tasks/Tasks";
import WrapperForContainers from "../../shared/ui/WrapperForContainers/WrapperForContainers";

const KanbanBoard: React.FC = () => {
  return (
    <WrapperForContainers>
      <ContainerLeft>
        <Lessons />
      </ContainerLeft>
      <ContainerRight>
        <Tasks />
      </ContainerRight>
    </WrapperForContainers>
  );
};

export default KanbanBoard;
