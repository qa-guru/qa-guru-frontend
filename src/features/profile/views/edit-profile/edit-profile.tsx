import { FC } from "react";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import { InputPhone, InputText } from "shared/components/form";
import { UserUpdateInput } from "api/graphql/generated/graphql";
import AvatarUpload from "shared/components/avatar-upload";

import {
  StyledButtonStack,
  StyledCancelButton,
  StyledCloseIcon,
  StyledContainedButton,
  StyledInfoStack,
  StyledInputStack,
  StyledPaper,
  StyledPaperStack,
  StyledSubmitIcon,
  StyledWrapper,
} from "./edit-profile.styled";
import { IEditProfile } from "./edit-profile.types";

const EditProfile: FC<IEditProfile> = ({ user, updateUser }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const routeProfile = () => navigate("/profile");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: user?.id,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      git: user?.git || "",
      telegram: user?.telegram || "",
      stackOverflow: user?.stackOverflow || "",
      linkedin: user?.linkedin || "",
      skills: [],
    },
  });

  const onSubmit: SubmitHandler<UserUpdateInput> = (data) => {
    updateUser({
      variables: {
        input: data,
      },
      onCompleted: () => {
        navigate("/profile");
        enqueueSnackbar("Профиль обновлен", { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar(
          "Не удалось обновить данные. Пожалуйста, попробуйте снова",
          { variant: "error" }
        );
      },
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledButtonStack>
          <StyledCancelButton
            variant="contained"
            color="secondary"
            onClick={routeProfile}
          >
            <StyledCloseIcon fontSize="small" />
            Отменить
          </StyledCancelButton>
          <StyledContainedButton type="submit" variant="contained">
            <StyledSubmitIcon fontSize="small" />
            Сохранить
          </StyledContainedButton>
        </StyledButtonStack>
        <StyledPaperStack>
          <StyledPaper>
            <StyledWrapper>
              <AvatarUpload user={user} edit />
              <StyledInfoStack>
                <Typography variant="h3">Личная информация</Typography>
                <StyledInputStack>
                  <InputText
                    control={control}
                    name="firstName"
                    placeholder="Введите ваше имя"
                    label="Имя"
                    errors={errors}
                  />
                  <InputText
                    control={control}
                    name="lastName"
                    placeholder="Введите фамилию"
                    label="Фамилия"
                    errors={errors}
                  />
                </StyledInputStack>
                <StyledInputStack>
                  <InputText
                    control={control}
                    name="email"
                    placeholder="Введите E-mail"
                    label="E-mail"
                    errors={errors}
                    disabled
                  />
                  <InputPhone
                    control={control}
                    name="phoneNumber"
                    placeholder="+7 (555) 555-55-55"
                    label="Телефон"
                    errors={errors}
                  />
                </StyledInputStack>
              </StyledInfoStack>
            </StyledWrapper>
          </StyledPaper>
          <StyledPaper>
            <StyledInfoStack>
              <Typography variant="h3">Мои ссылки</Typography>
              <StyledInputStack>
                <InputText
                  control={control}
                  name="stackOverflow"
                  placeholder="Cсылка на stack overflow"
                  label="Stack overflow"
                  errors={errors}
                />
                <InputText
                  control={control}
                  name="git"
                  placeholder="Cсылка на gitHub"
                  label="GitHub"
                  errors={errors}
                />
              </StyledInputStack>
              <StyledInputStack>
                <InputText
                  control={control}
                  name="linkedIn"
                  placeholder="Cсылка на linkedIn"
                  label="LinkedIn"
                  errors={errors}
                />
                <InputText
                  control={control}
                  name="telegram"
                  placeholder="Cсылка на telegram"
                  label="Telegram"
                  errors={errors}
                />
              </StyledInputStack>
            </StyledInfoStack>
          </StyledPaper>
        </StyledPaperStack>
      </form>
    </Container>
  );
};

export default EditProfile;
