import Lessons from "../../features/KanbanBoard/models/Lessons/Lessons";
import ContainerLeft from "../../shared/ui/Containers/ContainerLeft/ContainerLeft";
import ContainerRight from "../../shared/ui/Containers/ContainerRight/ConteinerRight";
import Tasks from "../../features/KanbanBoard/models/Tasks/Tasks";

const KanbanBoard: React.FC = () => {
  return (
    <>
      <ContainerLeft>
        <Lessons />
      </ContainerLeft>
      <ContainerRight>
        <Tasks />
      </ContainerRight>
    </>
  );
};

export default KanbanBoard;
