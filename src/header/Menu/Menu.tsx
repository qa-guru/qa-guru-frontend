import { Link, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const AppMenu = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const pages = [
    {
      title: (
        <Link style={{ textDecoration: "none" }} to={""}>
          {t("page.home")}
        </Link>
      ),
      pageURL: "",
    },
    {
      title: (
        <Link style={{ textDecoration: "none" }} to="/kanban-board">
          {t("page.kanban")}
        </Link>
      ),
      pageURL: "kanban-board",
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
            style={{ textTransform: "none" }}
            key={pageURL}
            onClick={() => handleMenuClick(pageURL)}
            variant="text"
          >
            {title}
          </Button>
        );
      })}
    </Box>
  );
};

export default AppMenu;
