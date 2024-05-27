import { FC, useRef } from "react";
import { client } from "api";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Editor } from "shared/components/text-editor";
import SendButtons from "shared/components/send-buttons";

import { IUpdateHomeWork } from "./update-homework.types";
import { StyledBox, StyledWrapper } from "./update-homework.styled";

const UpdateHomework: FC<IUpdateHomeWork> = (props) => {
  const { loading, updateHomework, setOpenHomeWorkEdit, answer, id } = props;
  const rteRef = useRef<RichTextEditorRef>(null);

  const handleUpdateHomework = () => {
    if (rteRef && id) {
      updateHomework({
        variables: {
          id,
          content: rteRef.current?.editor?.getHTML() ?? "",
        },
        onCompleted: () => {
          client.refetchQueries({ include: ["homeWorkByLectureAndTraining"] });
          setOpenHomeWorkEdit(false);
        },
      });
    }
  };

  return (
    <form>
      <StyledWrapper>
        <StyledBox>
          <Editor content={answer} rteRef={rteRef} />
          <SendButtons
            onReply={handleUpdateHomework}
            onCancel={() => setOpenHomeWorkEdit(false)}
            loading={loading}
          />
        </StyledBox>
      </StyledWrapper>
    </form>
  );
};

export default UpdateHomework;
