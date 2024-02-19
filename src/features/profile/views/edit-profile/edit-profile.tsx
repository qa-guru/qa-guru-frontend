import { FC } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputChip, InputPhone, InputText } from "shared/components/form";

import { IEditProfile, IEditProfileForm, skills } from "./edit-profile.types";
import AvatarUpload from "../avatar-upload";
import {
  StyledIcon,
  StyledPaper,
  StyledRouteButton,
} from "./edit-profile.styled";

const EditProfile: FC<IEditProfile> = ({ user }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const routeProfile = () => navigate("/profile");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IEditProfileForm>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      git: user?.git,
      telegram: user?.telegram,
      stackOverflow: user?.stackOverflow,
      linkedin: user?.linkedin,
      skills: [],
    },
    // resolver: yupResolver(
    //   yup.object().shape({
    //     firstName: yup.string().required(t("firstName.required")),
    //     lastName: yup.string().required(t("lastName.required")),
    //     email: yup.string().required(t("email.required")),
    //     phoneNumber: yup.string().required(t("phone.required")),
    //   })
    // ),
  });

  return (
    <Container>
      <StyledRouteButton
        variant="outlined"
        color="primary"
        onClick={routeProfile}
      >
        <StyledIcon />
        Назад
      </StyledRouteButton>
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
        <StyledPaper>
          <Typography variant="h3">Ключевые навыки</Typography>
          <Box sx={{ marginTop: "20px" }}>
            <InputChip
              control={control}
              name="skills"
              size="medium"
              options={skills}
              onDelete={() => {}}
            />
          </Box>
        </StyledPaper>
      </Stack>
    </Container>
  );
};

export default EditProfile;
