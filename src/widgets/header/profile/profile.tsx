import React from "react";
import { Button, ListItemIcon, MenuList } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import Logout from "features/authorization/containers/logout-container";
import UserRow from "shared/components/user-row";
import { IProfile } from "./profile.types";
import {
  StyledBox,
  StyledListItemText,
  StyledMenuItem,
} from "./profile.styled";

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
          <StyledBox>
            <UserRow user={props.data.user!} variant="subtitle2" />
          </StyledBox>
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
              <StyledMenuItem onClick={handleClickSettingsProfile}>
                <StyledListItemText>{title}</StyledListItemText>
                <ListItemIcon>{icon}</ListItemIcon>
              </StyledMenuItem>
              <Logout setAnchorElUser={setAnchorElUser} />
            </MenuList>
          );
        })}
      </Menu>
    </>
  );
};

export default Profile;
