import { FC, useRef } from "react";
import { client } from "api";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Editor } from "shared/components/text-editor";
import { useParams } from "react-router-dom";

import { ISendHomeWork } from "./send-homework.types";
import {
  StyledBox,
  StyledLoadingButton,
  StyledStack,
} from "./send-homework.styled";

const SendHomework: FC<ISendHomeWork> = (props) => {
  const { sendHomeWorkToCheck, loading } = props;
  const { lectureId, trainingId } = useParams();

  const rteRef = useRef<RichTextEditorRef>(null);

  const handleSendHomeWork = () => {
    if (lectureId) {
      sendHomeWorkToCheck({
        variables: {
          trainingId: trainingId!,
          lectureId,
          content: rteRef.current?.editor?.getHTML() ?? "",
        },
        onCompleted: () =>
          client.refetchQueries({ include: ["homeWorkByLectureAndTraining"] }),
      });
    }
  };

  return (
    <form>
      <StyledStack>
        <StyledBox>
          <Editor rteRef={rteRef} />
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
