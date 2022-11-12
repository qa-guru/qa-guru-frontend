import { useCreateUserMutation as _useCreateUserMutation } from "../../../generated/graphql";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

export const useCreateUserMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  return _useCreateUserMutation({
    onError: (error) =>
      error.graphQLErrors.map(({ message }) => {
        const email = message.split(" ").reverse()[0].replace(/['"]+/g, "");
        enqueueSnackbar(t("create.user", { email: email }));
      }),
  });
};
