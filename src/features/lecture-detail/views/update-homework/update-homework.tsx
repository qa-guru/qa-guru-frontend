import { FC, useRef } from "react";
import { client } from "api";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Editor } from "shared/components/text-editor";

import { IUpdateHomeWork } from "./update-homework.types";
import {
  StyledBox,
  StyledCancelButton,
  StyledLoadingButton,
  StyledStack,
  StyledWrapper,
} from "./update-homework.styled";

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
          client.refetchQueries({ include: ["homeWorkByLecture"] });
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
          <StyledStack>
            <StyledCancelButton onClick={() => setOpenHomeWorkEdit(false)}>
              Отменить
            </StyledCancelButton>
            <StyledLoadingButton
              onClick={handleUpdateHomework}
              loading={loading}
            >
              Отправить
            </StyledLoadingButton>
          </StyledStack>
        </StyledBox>
      </StyledWrapper>
    </form>
  );
};

export default UpdateHomework;
