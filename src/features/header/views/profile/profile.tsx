import { FC, MouseEvent, useState } from "react";
import { Box, Divider, ListItemIcon, ListItemText } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Logout from "features/authorization/containers/logout";
import UserRow from "shared/components/user-row";
import PersonIcon from "@mui/icons-material/Person";
import { useRoleAccess, useResponsive } from "shared/hooks";
import { UserRole } from "api/graphql/generated/graphql";
import {
  Group,
  Leaderboard,
  School,
  SpaceDashboard,
} from "@mui/icons-material";
import CustomLink from "shared/components/custom-link";

import { IProfile } from "./profile.types";
import {
  StyledBox,
  StyledButton,
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
  const { isMobile, isDesktop } = useResponsive();

  const settings = [
    {
      title: "Профиль",
      icon: <PersonIcon />,
      url: "/profile",
      id: 0,
    },
  ];

  const hasAdminAccess = useRoleAccess({ allowedRoles: [UserRole.Admin] });

  if (hasAdminAccess)
    if (isDesktop) {
      settings.push({
        title: "Админ панель",
        icon: <SpaceDashboard />,
        url: "/admin-panel/courses",
        id: 1,
      });
    } else {
      settings.push(
        {
          title: "Курсы",
          icon: <School />,
          url: "/admin-panel/courses",
          id: 2,
        },
        {
          title: "Пользователи",
          icon: <Group />,
          url: "/admin-panel/users",
          id: 3,
        },
        {
          title: "Статистика",
          icon: <Leaderboard />,
          url: "/admin-panel/statistics",
          id: 4,
        }
      );
    }

  const handleOpenProfile = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClickSettingsProfile = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Профиль пользователя">
        <StyledButton variant="text" onClick={handleOpenProfile} disableRipple>
          <StyledBox>
            <UserRow
              user={user}
              hideFullName={isMobile}
              variant="body2"
              hideRating={isMobile}
              roles={!isMobile ? user?.roles : null}
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
          horizontal: "center",
        }}
      >
        <StyledUserBox>
          <UserRow user={user} email={user?.email} variant="body2" hideAvatar />
        </StyledUserBox>
        <Divider />
        {settings.map((setting) => {
          const { icon, title, url, id } = setting;

          return (
            <Box key={id}>
              <CustomLink path={url}>
                <StyledMenuItem onClick={handleClickSettingsProfile} key={id}>
                  <StyledStack>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText secondary={title} />
                  </StyledStack>
                </StyledMenuItem>
              </CustomLink>
            </Box>
          );
        })}
        <Divider />
        <Logout setAnchorElUser={setAnchorElUser} />
      </StyledMenu>
    </>
  );
};

export default Profile;
