import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Notifications, AccountCircle, Settings, ArrowBack } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(45deg, #3b82f6 30%, #60a5fa 90%);
  box-shadow: 0 3px 5px 2px rgba(59, 130, 246, .3);
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        {/* Back button will only appear if the user is not on the home page */}
        {location.pathname !== '/' && (
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <LogoLink to="/">Taskie</LogoLink>
        </Typography>
        <IconButton color="inherit">
          <Notifications />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <IconButton color="inherit" onClick={handleMenu}>
          <Settings />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Preferences</MenuItem>
          <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
