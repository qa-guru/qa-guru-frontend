import { FC } from "react";
import { Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useTranslation } from "react-i18next";
import { InputPhone, InputText } from "shared/components/form";

import { IEditProfile, IEditProfileForm } from "./edit-profile.types";
import AvatarUpload from "../avatar-upload";
import {
  StyledPaper,
  StyledRouteButton,
  StyledIcon,
} from "./edit-profile.styled";

const EditProfile: FC<IEditProfile> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const routeProfile = () => navigate("/profile");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IEditProfileForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      git: "",
      telegram: "",
      stackOverflow: "",
      linkedin: "",
      website: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required(t("firstName.required")),
        lastName: yup.string().required(t("lastName.required")),
        email: yup.string().required(t("email.required")),
        phoneNumber: yup.string().required(t("phone.required")),
      })
    ),
  });

  return (
    <Container>
      <StyledRouteButton
        variant="outlined"
        color="primary"
        onClick={routeProfile}
      >
        <StyledIcon />К списку курсов
      </StyledRouteButton>
      <Stack direction="column" width="100%" spacing="30px">
        <StyledPaper>
          <Stack direction="row">
            <AvatarUpload />
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
                  label={t("firstName")}
                  errors={errors}
                />
                <InputText
                  control={control}
                  name="lastName"
                  placeholder="Введите фамилию"
                  label={t("lastName")}
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
                  placeholder="(555) 555-5555"
                  label="Phone"
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
                name="firstName"
                placeholder="Введите ваше имя"
                label={t("firstName")}
                errors={errors}
              />
              <InputText
                control={control}
                name="lastName"
                placeholder="Введите фамилию"
                label={t("lastName")}
                errors={errors}
              />
            </Stack>
            <Stack direction="row" spacing="30px">
              <InputText
                control={control}
                name="firstName"
                placeholder="Введите ваше имя"
                label={t("firstName")}
                errors={errors}
              />
              <InputText
                control={control}
                name="lastName"
                placeholder="Введите фамилию"
                label={t("lastName")}
                errors={errors}
              />
            </Stack>
            <Stack direction="row" spacing="30px">
              <InputText
                control={control}
                name="firstName"
                placeholder="Введите ваше имя"
                label={t("firstName")}
                errors={errors}
              />
            </Stack>
          </Stack>
        </StyledPaper>
        <StyledPaper>
          <Typography variant="h3">Ключевые навыки</Typography>
        </StyledPaper>
        <StyledPaper>
          <Typography variant="h3">Опыт работы</Typography>
        </StyledPaper>
      </Stack>
    </Container>
  );
};

export default EditProfile;
