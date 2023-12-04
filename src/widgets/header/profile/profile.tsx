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
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Logout from "features/authorization/containers/logout-container";
import UserRow from "shared/components/user-row";
import { useTheme } from "@mui/system";
import { IProfile } from "./profile.types";
import {
  StyledBox,
  StyledLink,
  StyledListItemText,
  StyledMenu,
  StyledStack,
  StyledUserBox,
} from "./profile.styled";
import { UserRole } from "../../../api/graphql/generated/graphql";

const Profile: FC<IProfile> = (props) => {
  const settings = [
    {
      title: "Профиль",
      icon: <PersonIcon />,
      url: "/profile",
    },
  ];

  const roles = props.data?.user?.roles;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenProfile = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClickSettingsProfile = () => {
    setAnchorElUser(null);
  };

  if (roles?.includes(UserRole.Admin)) {
    settings.push({
      title: "Пользователи",
      icon: <SupervisorAccountIcon />,
      url: "/admin",
    });
  }

  return (
    <>
      <Tooltip title="Open settings">
        <Button variant="text" onClick={handleOpenProfile}>
          <StyledBox>
            <UserRow
              user={props.data.user}
              roles={props.data?.user?.roles}
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
        {settings.map((setting, index) => {
          const { icon, title, url } = setting;

          return (
            <>
              <StyledUserBox>
                <UserRow
                  user={props.data.user}
                  email={props.data.user?.email}
                  variant="body2"
                  width={0}
                />
              </StyledUserBox>
              <Divider />
              <MenuList sx={{ margin: 0 }} key={index}>
                <MenuItem
                  sx={{ margin: 0, padding: "10px" }}
                  onClick={handleClickSettingsProfile}
                >
                  <StyledLink to={url}>
                    <StyledStack sx={{ margin: 0, padding: 0 }}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <StyledListItemText secondary={title} />
                    </StyledStack>
                  </StyledLink>
                </MenuItem>
                <Logout setAnchorElUser={setAnchorElUser} />
              </MenuList>
            </>
          );
        })}
      </StyledMenu>
    </>
  );
};

export default Profile;
