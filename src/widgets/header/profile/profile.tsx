import { FC, MouseEvent, useState } from "react";
import {
  Button,
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  useMediaQuery,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Logout from "features/authorization/containers/logout";
import UserRow from "shared/components/user-row";
import { useTheme } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import useRoleAccess from "shared/hooks/use-role-access";
import { UserRole } from "api/graphql/generated/graphql";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

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
  const {
    data: { user },
  } = props;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
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
      title: "Пользователи",
      icon: <SupervisorAccountIcon />,
      url: "/admin",
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
        <Button variant="text" onClick={handleOpenProfile}>
          <StyledBox>
            <UserRow
              user={user}
              roles={user?.roles}
              hideFullName={isDownSm}
              variant="body2"
            />
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
        <StyledUserBox>
          <UserRow user={user} email={user?.email} variant="body2" width={0} />
        </StyledUserBox>
        <Divider />
        {settings.map((setting) => {
          const { icon, title, url, id } = setting;

          return (
            <div key={id}>
              <MenuList sx={{ margin: 0, padding: 0 }}>
                <MenuItem
                  sx={{ margin: 0, padding: "7px" }}
                  onClick={handleClickSettingsProfile}
                >
                  <StyledLink to={url}>
                    <StyledStack sx={{ margin: 0, padding: 0 }}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <StyledListItemText secondary={title} />
                    </StyledStack>
                  </StyledLink>
                </MenuItem>
              </MenuList>
            </div>
          );
        })}
        <Divider />
        <Logout setAnchorElUser={setAnchorElUser} />
      </StyledMenu>
    </>
  );
};

export default Profile;
