import { FC, useRef } from "react";

import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Editor } from "shared/components/text-editor";
import SendButtons from "shared/components/send-buttons";

import { IUpdateHomeWork } from "./update-homework.types";
import { StyledBox, StyledWrapper } from "./update-homework.styled";

const UpdateHomework: FC<IUpdateHomeWork> = (props) => {
  const { loading, updateHomework, setOpenHomeWorkEdit, answer, homeWorkId } =
    props;
  const rteRef = useRef<RichTextEditorRef>(null);

  const handleUpdateHomework = () => {
    if (rteRef && homeWorkId) {
      updateHomework({
        variables: {
          id: homeWorkId,
          content: rteRef.current?.editor?.getHTML() ?? "",
        },
        onCompleted: () => {
          setOpenHomeWorkEdit(false);
        },
      });
    }
  };

  return (
    <form>
      <StyledWrapper>
        <StyledBox>
          <Editor content={answer} rteRef={rteRef} homeWorkId={homeWorkId} />
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
