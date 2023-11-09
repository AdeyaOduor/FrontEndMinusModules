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
  Typography
} from '@material-ui/core';
import {
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Public as PublicIcon,
  LegendToggle as LegendToggleIcon,
  EventAvailable as EventAvailableIcon
} from '@material-ui/icons';
import getInitials from '../../REST-API/utils/getInitials';
import { getCurrentUser, signOut } from '../../REST-API/auth/AuthProvider';
import NavItem from '../navbar/NavItem';

const items = [
  {
    href: '',
    icon: DashboardIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/targettrees',
    icon: EventAvailableIcon,
    title: 'Targets & Trees'
  },
  {
    href: '/app/treeplanting',
    icon: PublicIcon,
    title: 'Tree Data & Planting'
  },
  {
    href: '/app/statusmonitoring',
    icon: LegendToggleIcon,
    title: 'Tree Monitoring'
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
    //localStorage.clear();
    navigate('/home', { replace: true });
  };


  const content = (
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
          p: 2
        }}
      >
        <Avatar
          src='https://cdn-icons-png.flaticon.com/128/149/149071.png'
          alt='Avatar'
          component={RouterLink}
          to="/app/account"
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
        >
          {getInitials(user?.username || '')}
        </Avatar>
        <Typography color="white" variant="h4">
          {user?.username}
        </Typography>
        <Typography color="white" variant="body2">
          {user?.surname || 'School Manager'}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Button
        color="primary"
        fullWidth
        onClick={handleLogout}
        startIcon={<LogoutIcon />}
      >
        Logout
      </Button>
    </Box>
  );

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
              width: 256
            }
          }}
        >
          {content}
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
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
