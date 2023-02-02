import React from "react";
import Menu from "./Menu";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MenuContainer: React.FC = () => {
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
  ];

  const handleMenuClick = (pageURL: any) => {
    navigate(pageURL);
  };

  return <Menu handleMenuClick={handleMenuClick} pages={pages} />;
};

export default MenuContainer;
