import { FC, MouseEvent, useState } from "react";
import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Logout from "features/authorization/containers/logout";
import UserRow from "shared/components/user-row";
import PersonIcon from "@mui/icons-material/Person";
import useRoleAccess from "shared/hooks/use-role-access";
import { UserRole } from "api/graphql/generated/graphql";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import useResponsive from "shared/hooks/use-responsive";

import { IProfile } from "./profile.types";
import {
  StyledBox,
  StyledButton,
  StyledLink,
  StyledMenu,
  StyledMenuItem,
  StyledStack,
  StyledUserBox,
} from "./profile.styled";

const Profile: FC<IProfile> = (props) => {
  const {
    data: { user },
  } = props;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { isMobile } = useResponsive();

  const settings = [
    {
      title: "Профиль",
      icon: <PersonIcon />,
      url: "/profile",
      id: 0,
    },
  ];

  const hasAdminAccess = useRoleAccess({ allowedRoles: [UserRole.Admin] });

  if (hasAdminAccess) {
    settings.push({
      title: "Админ панель",
      icon: <SpaceDashboardIcon />,
      url: "/admin-panel",
      id: 1,
    });
  }

  const handleOpenProfile = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClickSettingsProfile = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Open settings">
        <StyledButton variant="text" onClick={handleOpenProfile}>
          <StyledBox>
            <UserRow
              user={user}
              hideFullName={isMobile}
              variant="body2"
              hideRating={isMobile}
            />
          </StyledBox>
        </StyledButton>
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
        <StyledUserBox>
          <UserRow user={user} email={user?.email} variant="body2" hideAvatar />
        </StyledUserBox>
        <Divider />
        {settings.map((setting) => {
          const { icon, title, url, id } = setting;

          return (
            <StyledLink to={url} key={id}>
              <StyledMenuItem onClick={handleClickSettingsProfile}>
                <StyledStack>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText secondary={title} />
                </StyledStack>
              </StyledMenuItem>
            </StyledLink>
          );
        })}
        <Divider />
        <Logout setAnchorElUser={setAnchorElUser} />
      </StyledMenu>
    </>
  );
};

export default Profile;
