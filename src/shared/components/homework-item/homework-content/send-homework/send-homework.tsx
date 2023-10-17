import { FC, useContext, ChangeEvent } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import RHF from "shared/components/input-RHF";
import { client } from "api";
import { LectureIdContext } from "features/lecture-detail/context/lecture-id-context";
import { ISendHomeWorkContent, ISendHomeWork } from "./send-homework.types";
import {
  StyledBox,
  StyledLoadingButton,
  StyledStack,
} from "./send-homework.styled";
import { MAX_HOMEWORK_LENGTH } from "../../../../constants";

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
    sendHomeWorkToCheck({
      variables: { lectureId: lectureId!, content: data.content },
      onCompleted: () =>
        client.refetchQueries({ include: ["homeWorkByLecture"] }),
    });
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    trigger("content").then((isValid) => {
      if (isValid && e.target.value.length >= MAX_HOMEWORK_LENGTH) {
        setError("content", {
          type: "manual",
          message: t("homework.max")!,
        });
      }
    });
  };

  return (
    <form>
      <StyledStack>
        <StyledBox>
          <FormControl fullWidth>
            <RHF.InputTextField
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
            />
            {errors?.content && (
              <FormHelperText error>{errors?.content.message}</FormHelperText>
            )}
          </FormControl>
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
