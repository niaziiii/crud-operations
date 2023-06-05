import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { MenuItem, Menu, Typography, IconButton, Box } from "@mui/material";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Profile = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user } = useUser();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0, pl: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt="Remy Sharp"
            src={(user as { picture: string }).picture}
          />
        </IconButton>
        <Typography variant="h6" sx={{ fontSize: ".9rem" }}>
          {(user as { given_name: string }).given_name}
        </Typography>
      </Box>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu} sx={{ color: "black" }}>
          <Link className="blacklink" href="/api/auth/logout">
            logout
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Profile;
