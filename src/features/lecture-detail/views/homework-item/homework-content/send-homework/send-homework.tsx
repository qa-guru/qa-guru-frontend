import { FC, useContext, ChangeEvent, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { client } from "api";
import { LectureIdContext } from "features/lecture-detail/context/lecture-id-context";
import InputText from "shared/components/form/input-text";
import { MAX_HOMEWORK_LENGTH } from "shared/constants";
import { ISendHomeWorkContent, ISendHomeWork } from "./send-homework.types";
import {
  StyledBox,
  StyledLoadingButton,
  StyledStack,
} from "./send-homework.styled";

const SendHomework: FC<ISendHomeWork> = (props) => {
  const { sendHomeWorkToCheck, loading } = props;
  const lectureId = useContext(LectureIdContext);
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    trigger,
  } = useForm<ISendHomeWorkContent>({
    defaultValues: {
      content: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        content: yup.string().required(t("homework")!),
      })
    ),
  });

  const sendHomeWork: SubmitHandler<ISendHomeWorkContent> = (data) => {
    if (lectureId) {
      sendHomeWorkToCheck({
        variables: { lectureId, content: data.content },
        onCompleted: () =>
          client.refetchQueries({ include: ["homeWorkByLecture"] }),
      });
    }
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      trigger("content").then((isValid) => {
        if (isValid && e.target.value.length >= MAX_HOMEWORK_LENGTH) {
          setError("content", {
            type: "manual",
            message: t("homework.max")!,
          });
        }
      });
    },
    [trigger, setError, MAX_HOMEWORK_LENGTH, t]
  );

  return (
    <form>
      <StyledStack>
        <StyledBox>
          <InputText
            placeholder="Текст ответа"
            multiline
            maxRows={10}
            minRows={5}
            name="content"
            control={control}
            inputProps={{
              maxLength: MAX_HOMEWORK_LENGTH,
              onChange: handleChange,
            }}
            errors={errors}
          />
          <StyledLoadingButton
            variant="contained"
            loading={loading}
            onClick={handleSubmit(sendHomeWork)}
          >
            Отправить
          </StyledLoadingButton>
        </StyledBox>
      </StyledStack>
    </form>
  );
};

export default SendHomework;
