import React from "react";
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Logout from "../../Authorization/Logout";
import { UserQuery } from "../../../generated/graphql";

interface IProfile {
  data: UserQuery;
}

const style = {
  menuItem: { mb: "10px" },
  listItemText: { mr: "20px" },
  box: {
    width: "max-content",
    ml: "16px",
  },
  avatar: {
    width: 40,
    height: 40,
  },
  typography: {
    display: { xs: "none", md: "block" },
  },
};

const Profile: React.FC<IProfile> = (props) => {
  const { data } = props;

  const settings = [
    {
      title: "Настройки",
      icon: <ExitToAppIcon />,
    },
  ];

  const [anchorElUser, setAnchorElUser] =
    React.useState<null | HTMLElement>(null);

  const handleOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClickSettingsProfile = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Open settings">
        <Button onClick={handleOpenProfile}>
          <Avatar
            sx={style.avatar}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
          <Box sx={style.box}>
            <Typography sx={style.typography} variant="subtitle2">
              {data?.user?.firstName}
            </Typography>
            <Typography sx={style.typography} variant="subtitle2">
              {data?.user?.lastName}
            </Typography>
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
