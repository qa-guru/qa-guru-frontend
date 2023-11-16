import { FC, MouseEvent, useState } from "react";
import {
  Button,
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";
import Logout from "features/authorization/containers/logout-container";
import UserRow from "shared/components/user-row";
import { IProfile } from "./profile.types";
import {
  StyledBox,
  StyledLink,
  StyledListItemText,
  StyledMenu,
  StyledStack,
  StyledUserBox,
} from "./profile.styled";

const Profile: FC<IProfile> = (props) => {
  const settings = [
    {
      title: "Профиль",
      icon: <PersonIcon />,
      url: "/profile",
    },
  ];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenProfile = (event: MouseEvent<HTMLElement>) => {
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
            <UserRow user={props.data.user} variant="body1" />
          </StyledBox>
        </Button>
      </Tooltip>
      <StyledMenu
        anchorEl={anchorElUser}
        keepMounted
        open={Boolean(anchorElUser)}
        onClose={handleClickSettingsProfile}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {settings.map((setting, index) => {
          const { icon, title, url } = setting;

          return (
            <MenuList key={index}>
              <StyledUserBox>
                <UserRow
                  user={props.data.user}
                  email={props.data.user?.email}
                  variant="body2"
                  width={0}
                />
              </StyledUserBox>
              <Divider />
              <MenuItem onClick={handleClickSettingsProfile}>
                <StyledLink to={url}>
                  <StyledStack>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <StyledListItemText secondary={title} />
                  </StyledStack>
                </StyledLink>
              </MenuItem>
            </MenuList>
          );
        })}
        <Divider />
        <Logout setAnchorElUser={setAnchorElUser} />
      </StyledMenu>
    </>
  );
};

export default Profile;
