import { FC, useContext, useRef } from "react";
import { client } from "api";
import { type RichTextEditorRef } from "mui-tiptap";
import TextEditor from "shared/components/text-editor";
import { ISendHomeWork } from "./send-homework.types";
import {
  StyledBox,
  StyledLoadingButton,
  StyledStack,
} from "./send-homework.styled";
import { LectureIdContext } from "../../context/lecture-id-context";

const SendHomework: FC<ISendHomeWork> = (props) => {
  const { sendHomeWorkToCheck, loading } = props;
  const lectureId = useContext(LectureIdContext);
  const rteRef = useRef<RichTextEditorRef>(null);

  const handleSendHomeWork = () => {
    if (lectureId) {
      sendHomeWorkToCheck({
        variables: {
          lectureId,
          content: rteRef.current?.editor?.getHTML() ?? "",
        },
        onCompleted: () =>
          client.refetchQueries({ include: ["homeWorkByLecture"] }),
      });
    }
  };

  return (
    <form>
      <StyledStack>
        <StyledBox>
          <TextEditor rteRef={rteRef} />
          <StyledLoadingButton
            variant="contained"
            loading={loading}
            onClick={handleSendHomeWork}
          >
            Отправить
          </StyledLoadingButton>
        </StyledBox>
      </StyledStack>
    </form>
  );
};

export default SendHomework;
