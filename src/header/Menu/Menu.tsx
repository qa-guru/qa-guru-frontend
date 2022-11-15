import { Link, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const AppMenu = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const pages = [
    {
      title: <Link to={""}>{t("page.home")}</Link>,
      pageURL: "",
    },
    {
      title: <Link to="kanban-board">{t("page.kanban")}</Link>,
      pageURL: "kanban-board",
    },
    {
      title: <Link to="admin">{t("page.admin")}</Link>,
      pageURL: "admin",
    },
    {
      title: <Link to="homework">{t("page.homework")}</Link>,
      pageURL: "homework",
    },
    {
      title: <Link to="lecture">{t("page.lecture")}</Link>,
      pageURL: "lecture",
    },
    {
      title: <Link to="training">{t("page.training")}</Link>,
      pageURL: "training",
    },
  ];

  const handleMenuClick = (pageURL: any) => {
    navigate(pageURL);
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => {
        const { title, pageURL } = page;
        return (
          <Button
            key={pageURL}
            onClick={() => handleMenuClick(pageURL)}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {title}
          </Button>
        );
      })}
    </Box>
  );
};

export default AppMenu;
