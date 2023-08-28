import React from "react";
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { IProfile } from "./Profile.types";
import { style } from "./styles";
import Logout from "../../../features/Authorization/containers/LogoutContainer";
import UserRow from "../../../shared/components/UserRow";

const Profile: React.FC<IProfile> = (props) => {
  const { firstName, lastName } = props.data.user!;
  const fullName = `${firstName} ${lastName}`;

  const settings = [
    {
      title: "Настройки",
      icon: <SettingsIcon />,
    },
  ];

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClickSettingsProfile = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Open settings">
        <Button variant="text" onClick={handleOpenProfile}>
          <Box sx={style.box}>
            <UserRow user={props.data.user!} variant="subtitle2" />
          </Box>
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorElUser}
        keepMounted
        open={Boolean(anchorElUser)}
        onClose={handleClickSettingsProfile}
      >
        {settings.map((setting, index) => {
          const { icon, title } = setting;

          return (
            <MenuList key={index}>
              <MenuItem
                onClick={handleClickSettingsProfile}
                sx={style.menuItem}
              >
                <ListItemText sx={style.listItemText}>{title}</ListItemText>
                <ListItemIcon>{icon}</ListItemIcon>
              </MenuItem>
              <Logout setAnchorElUser={setAnchorElUser} />
            </MenuList>
          );
        })}
      </Menu>
    </>
  );
};

export default Profile;
