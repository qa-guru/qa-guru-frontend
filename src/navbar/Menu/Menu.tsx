import { Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { HomeOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const menuItems: ItemType[] = [
  {
    label: (
      <Link to={""}>
        <FormattedMessage id={"screen.home"} />
      </Link>
    ),
    key: "",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Link to="practice-form">
        <FormattedMessage id="screen.PracticeForm" />
      </Link>
    ),
    key: "practice-form",
  },
  {
    label: (
      <Link to="autotests-generate">
        <FormattedMessage id="screen.AutotestsGenerate" />
      </Link>
    ),
    key: "autotests-generate",
  },
  {
    label: (
      <Link to="kanban-board">
        <FormattedMessage id="screen.KanbanBoard" />
      </Link>
    ),
    key: "kanban-board",
  },
  {
    label: (
      <Link to="lesson">
        <FormattedMessage id="screen.Lesson" />
      </Link>
    ),
    key: "lesson",
  },
];

export const AppMenu = () => {
  const { pathname } = useLocation();
  const selectedKey = toSelectedKey(pathname);

  return (
    <Menu mode={"vertical"} selectedKeys={[selectedKey]} items={menuItems} />
  );
};

function toSelectedKey(pathname: string) {
  return pathname.split("/", 2).join("");
}
