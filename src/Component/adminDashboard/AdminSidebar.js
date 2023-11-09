import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { getCurrentUser, signOut } from '../../REST-API/auth/AuthProvider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import NatureIcon from '@mui/icons-material/Nature';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import getInitials from '../../REST-API/utils/getInitials';
import {
  Logout as LogoutIcon,
} from '@material-ui/icons';

const items = [
  {
    to: '',
    icon: <DashboardIcon />,
    title: 'Dashboard',
  },
  {
    to: '/admin/target-trees',
    icon: <LocalFloristIcon />,
    title: 'Target Trees',
  },
  {
    to: '/admin/planted-trees',
    icon: <NatureIcon />,
    title: 'Planted Trees',
  },
  {
    to: '/admin/monitoring',
    icon: <LegendToggleIcon />,
    title: 'Monitoring',
  },
  
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname, onMobileClose, openMobile]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Navigates to the homepage which Calls the signOut method on mount
    // and clears the logged in user from local storage.
    signOut();
    localStorage.clear();
    navigate('/home', { replace: true });
  };

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {renderSidebarContent(user, handleLogout)}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 257,
              top: 64,
              height: 'calc(100% - 64px)',
            },
          }}
        >
          {renderSidebarContent(user, handleLogout)}
        </Drawer>
      </Hidden>
    </>
  );
};

const renderSidebarContent = (user, handleLogout) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#6B8E23',
      color: '#fff',
    }}
  >
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Avatar
        src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
        alt="Avatar"
        component={RouterLink}
        to="/app/account"
        sx={{
          cursor: 'pointer',
          width: 64,
          height: 64,
        }}
      >
        {getInitials(user?.username || '')}
      </Avatar>
      <Typography color="white" variant="h6">
        {user?.username || 'Admin'}
      </Typography>
      <Typography color="white" variant="body1">
        {user?.fullNames || 'Admin'}
      </Typography>
    </Box>
    <Divider />
    <Box sx={{ p: 2 }}>
      <List>
        {items.map((item) => (
          <ListItem
            button
            component={RouterLink}
            to={item.to}
            key={item.title}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Box>
    <Box sx={{ flexGrow: 1 }} />

  </Box>
);

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false,
};

export default DashboardSidebar;
