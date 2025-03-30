import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  styled,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft,
  Dashboard,
  People,
  Settings,
  Assignment,
  AccountCircle,
  Notifications,
  ExitToApp,
  Person,
  BarChart,
  Description,
  Mail,
  CalendarToday
} from '@mui/icons-material';
import { useNavigate, Outlet } from 'react-router-dom';
// import Dashboard from './Dashboard';

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  })
);

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  zIndex: theme.zIndex.drawer + 1,
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    borderRight: 'none',
    boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5, 2),
  '&:hover': {
    backgroundColor: 'rgba(46, 125, 50, 0.08)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(46, 125, 50, 0.12)',
    '&:hover': {
      backgroundColor: 'rgba(46, 125, 50, 0.16)',
    },
  },
}));

function MainLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Staff Management', icon: <People />, path: '/staff' },
    { text: 'Reports', icon: <BarChart />, path: '/reports' },
    { text: 'Documents', icon: <Description />, path: '/documents' },
    { text: 'Calendar', icon: <CalendarToday />, path: '/calendar' },
    { text: 'Messages', icon: <Mail />, path: '/messages' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const UserProfile = () => (
    <Box sx={{ 
      p: 2, 
      borderTop: '1px solid',
      borderColor: 'divider',
      mt: 'auto'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ 
          bgcolor: theme.palette.primary.main,
          width: 40,
          height: 40
        }}>
          {userInfo?.name?.charAt(0)}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {userInfo?.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {userInfo?.role}
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleLogout}>
          <ExitToApp fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  const UserMenu = () => (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        sx: { width: 220, mt: 1.5 }
      }}
    >
      <MenuItem onClick={() => navigate('/profile')}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => navigate('/settings')}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <ExitToApp fontSize="small" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img 
              src="/assembly-logo.png" 
              alt="Logo" 
              style={{ height: 40 }}
            />
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                fontWeight: 600,
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              Assembly Management System
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              color="inherit" 
              sx={{ 
                bgcolor: 'action.hover',
                '&:hover': { bgcolor: 'action.selected' }
              }}
            >
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Avatar 
              sx={{ 
                cursor: 'pointer',
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              {userInfo?.name?.charAt(0)}
            </Avatar>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <StyledDrawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
            boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              src="/assembly-logo.png" 
              alt="Logo"
              sx={{ width: 40, height: 40 }}
            />
            <Typography variant="h6" color="primary" fontWeight={600}>
              Assembly
            </Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ mb: 2 }} />

        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <StyledListItemButton
                selected={selectedIndex === index}
                onClick={() => {
                  setSelectedIndex(index);
                  navigate(item.path);
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: selectedIndex === index ? 600 : 400
                  }}
                />
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>

        <UserProfile />
      </StyledDrawer>

      <Main>
        <DrawerHeader />
        <Outlet />
      </Main>

      <UserMenu />

      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { 
            mt: 1.5,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            minWidth: 300
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="inherit" noWrap>
            New staff member added
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="inherit" noWrap>
            Report generated successfully
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="inherit" noWrap>
            System update available
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default MainLayout; 