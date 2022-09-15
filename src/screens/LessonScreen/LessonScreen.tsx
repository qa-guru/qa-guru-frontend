import Lesson from "../../features/Lesson/models/Lesson/Lesson";
import Task from "../../features/Lesson/models/Task/Task";
import ContainerLeft from "../../shared/ui/Containers/ContainerLeft/ContainerLeft";
import ContainerRight from "../../shared/ui/Containers/ContainerRight/ConteinerRight";

const LessonScreen: React.FC = () => {
  return (
    <>
      <ContainerLeft>
        <Lesson />
      </ContainerLeft>
      <ContainerRight>
        <Task />
      </ContainerRight>
    </>
  );
};

export default LessonScreen;
