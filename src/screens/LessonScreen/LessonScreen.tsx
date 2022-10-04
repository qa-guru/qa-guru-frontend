import Lesson from "../../features/Lesson/models/Lesson/Lesson";
import Task from "../../features/Lesson/models/Task/Task";
import ContainerLeft from "../../shared/ui/Containers/ContainerLeft/ContainerLeft";
import ContainerRight from "../../shared/ui/Containers/ContainerRight/ConteinerRight";
import WrapperForContainers from "../../shared/ui/WrapperForContainers/WrapperForContainers";

const LessonScreen: React.FC = () => {
  return (
    <WrapperForContainers>
      <ContainerLeft>
        <Lesson />
      </ContainerLeft>
      <ContainerRight>
        <Task />
      </ContainerRight>
    </WrapperForContainers>
  );
};

export default LessonScreen;
