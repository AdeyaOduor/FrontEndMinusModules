import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  Menu,
  MenuItem,
  MenuList,
  Grid,
} from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import getInitials from '../../../REST-API/utils/getInitials';
import { getCurrentUser, signOut } from '../../../REST-API/auth/AuthProvider';
import NavItem from "../../navbar/NavItem";
import SchoolIcon from "@mui/icons-material/School";
import InsightsIcon from "@mui/icons-material/Insights";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PublicIcon from "@mui/icons-material/Public";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DashboardNavbar from "../../schoolDashboard/DashboardNavbar";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../../assets/logo.png";
import {
  Logout as LogoutIcon,
} from '@material-ui/icons';


const items = [
  {
    href: "",
    icon: DashboardIcon,
    title: "Dashboard",
  },
  {
    href: '/SCDE/SCDETargetTrees',
    icon: EventAvailableIcon,
    title: 'Targets Trees'
  },
  {
    href: '/SCDE/SCDETreePlanting',
    icon: PublicIcon,
    title: 'TreeData Planting'
  },
  {
    href: '/SCDE/SCDEMonitorTreeStatus',
    icon: InsightsIcon,
    title: 'Tree Monitoring'
  },
  {
    href: "/SCDE/schoolreports",
    icon: SchoolIcon,
    title: "Schools Reports",
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleToggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavItemClick = (path) => {
    handleMenuClose(); // Close the menu
    navigate(path);
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname, onMobileClose, openMobile]);

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

  

  // Event handler to toggle the sidebar
  // const handleToggleSidebar = () => {
  //   setSidebarOpen(!isSidebarOpen);
  // };
  const handleLogout = () => {
    // Navigates to the homepage which Calls the signOut method on mount
    // and clears the logged in user from local storage.
    signOut();
    localStorage.clear();
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
          src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
          alt="Avatar"
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
          {user?.fullNames || 'Guest'}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {user?.jobTitle || ''}
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
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>

      {/* large screens */}
      <Hidden lgDown>
        {/* brought the navbar here to avoid the top and side bar from overlapping in small screens */}

        <DashboardNavbar />
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 257,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>

      {/*small screens */}
      <Hidden lgUp>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            padding: 2,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Grid container>
            <Grid item sx={{ marginRight: "auto" }}>
              <img src={logo} alt="Logo" style={{ maxWidth: 100 }} />
            </Grid>
            <Grid item sx={{ right: 0 }}>
              <Button onClick={handleToggleMenu}>
                <MenuIcon sx={{ color: "black" }} />
              </Button>
            </Grid>
          </Grid>
          <Menu
            id="Trees-planted"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
                right: 0,
              }}
            >
              <Button onClick={handleMenuClose} color="primary">
                {" "}
                <CloseIcon />
              </Button>
            </Box>
            <MenuList style={{ backgroundColor: "white" }}>
              {items.map((item) => (
                <MenuItem
                  key={item.title}
                  onClick={() => handleNavItemClick(item.href)}
                >
                  {item.title}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
