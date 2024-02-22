import { FC } from "react";
import { Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputPhone, InputText } from "shared/components/form";
import { UserUpdateInput } from "api/graphql/generated/graphql";
import { useSnackbar } from "notistack";

import {
  StyledCancelButton,
  StyledSubmitButton,
  StyledPaper,
  StyledButtonStack,
  StyledCloseIcon,
  StyledSubmitIcon,
} from "./edit-profile.styled";
import { IEditProfile } from "./edit-profile.types";
import AvatarUpload from "../avatar-upload";
import { RESPONSE_STATUS } from "../../../authorization/constants";

const EditProfile: FC<IEditProfile> = ({ user, updateUser }) => {
  const { t } = useTranslation();
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
    // resolver: yupResolver(
    //   yup.object().shape({
    //     firstName: yup.string().required(t("firstName.required")),
    //     lastName: yup.string().required(t("lastName.required")),
    //     email: yup.string().required(t("email.required")),
    //     phoneNumber: yup.string().required(t("phone.required")),
    //     git: yup.string(),
    //     telegram: yup.string(),
    //     stackOverflow: yup.string(),
    //     linkedin: yup.string()
    //   })
    // ),
  });

  const onSubmit: SubmitHandler<UserUpdateInput> = (data) => {
    updateUser({
      variables: {
        input: data,
      },
    }).then((response) => {
      if (response.data && response.data.updateUser) {
        navigate("/profile");
        enqueueSnackbar("Профиль обновлен", { variant: "success" });
      } else {
        enqueueSnackbar(
          "Не удалось обновить данные. Пожалуйста, попробуйте снова",
          { variant: "error" }
        );
      }
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
            Отмена
          </StyledCancelButton>
          <StyledSubmitButton type="submit" variant="contained">
            <StyledSubmitIcon fontSize="small" />
            Сохранить
          </StyledSubmitButton>
        </StyledButtonStack>
        <Stack direction="column" width="100%" spacing="30px" mb="30px">
          <StyledPaper>
            <Stack direction="row">
              <AvatarUpload user={user} />
              <Stack
                direction="column"
                width="100%"
                padding="0 15px"
                spacing="20px"
              >
                <Typography variant="h3">Личная информация</Typography>
                <Stack direction="row" spacing="30px">
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
                </Stack>
                <Stack direction="row" spacing="30px">
                  <InputText
                    control={control}
                    name="email"
                    placeholder={t("enter.email")}
                    label="E-mail"
                    errors={errors}
                  />
                  <InputPhone
                    control={control}
                    name="phoneNumber"
                    placeholder="+7 (555) 555-55-55"
                    label="Телефон"
                    errors={errors}
                  />
                </Stack>
              </Stack>
            </Stack>
          </StyledPaper>
          <StyledPaper>
            <Stack
              direction="column"
              width="100%"
              paddingRight="15px"
              spacing="20px"
            >
              <Typography variant="h3">Мои ссылки</Typography>
              <Stack direction="row" spacing="30px">
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
              </Stack>
              <Stack direction="row" spacing="30px">
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
              </Stack>
            </Stack>
          </StyledPaper>
        </Stack>
      </form>
    </Container>
  );
};

export default EditProfile;
