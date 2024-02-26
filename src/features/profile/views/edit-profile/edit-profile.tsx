import React, { FC } from "react";
import { Container, Stack, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputPhone, InputText } from "shared/components/form";
import { UserUpdateInput } from "api/graphql/generated/graphql";
import { useSnackbar } from "notistack";
import { useTheme } from "@mui/system";

import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  StyledAvatarButtonStack,
  StyledButtonStack,
  StyledCancelButton,
  StyledCloseIcon,
  StyledContainedButton,
  StyledDeleteButton,
  StyledInfoStack,
  StyledInputStack,
  StyledPaper,
  StyledPaperStack,
  StyledSubmitIcon,
  StyledWrapper,
} from "./edit-profile.styled";
import { IEditProfile } from "./edit-profile.types";
import AvatarUpload from "../avatar-upload";
import { useAvatarDelete } from "../../hooks/use-avatar-delete";

const EditProfile: FC<IEditProfile> = ({ user, updateUser }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { deleteAvatar } = useAvatarDelete();
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

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
          <StyledContainedButton type="submit" variant="contained">
            <StyledSubmitIcon fontSize="small" />
            Сохранить
          </StyledContainedButton>
        </StyledButtonStack>
        <StyledPaperStack>
          <StyledPaper>
            <StyledWrapper>
              <Stack direction="row">
                <AvatarUpload user={user} hideIcons={isDownMd} />
                {isDownMd && (
                  <StyledAvatarButtonStack>
                    {user?.avatar && (
                      <StyledDeleteButton
                        variant="contained"
                        startIcon={<DeleteIcon fontSize="small" />}
                        onClick={() => deleteAvatar()}
                      >
                        Удалить фото
                      </StyledDeleteButton>
                    )}
                    <label htmlFor="icon-button-file">
                      <StyledContainedButton
                        variant="contained"
                        component="span"
                        startIcon={<ImageIcon fontSize="small" />}
                      >
                        Загрузить фото
                      </StyledContainedButton>
                    </label>
                  </StyledAvatarButtonStack>
                )}
              </Stack>
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
