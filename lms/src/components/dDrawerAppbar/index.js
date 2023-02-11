import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../../utils/logo';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { ListItemIcon, ListItemText, MenuList, ListItemButton } from '@mui/material';
import api from '../../api';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';


const drawerWidth = 300;

function DrawerAppBar() {
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const openDrawer = () => {
    setMobileOpen(true);
  };
  
  const closeDrawer = () =>{
    setMobileOpen(false);
  }


  function onNewVehicleClicked(){
    navigate("/login");
  }
  function onVehicleSelected(){
    navigate("/register")
  }
  


  const onLogout = () => {
    api.get("/logout", {withCredentials: true})
    .then(function(res){
      if(res.status === 200){
        console.log(res);
        window.location.href = "/";
      }
      else
      console.log(res);
    })
    .catch(function(err){
      console.log(err);
    });
  }

  const onProfile = () =>{
    navigate('/profile')
  }
  
  const settings = [
    [<AccountCircleIcon fontSize='small'/>, 'Profile', onProfile], 
    [<LogoutIcon fontSize='small'/>, 'Logout', onLogout]
  ];


  return (
    <Box sx={{ display: 'nav' }}>
      <AppBar component="nav" position='sticky'>
        <Toolbar>
          <Logo sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, height:"2rem", width:"2rem" }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            >
            LMS
          </Typography>
          <Logo sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, height:"3rem", width:"3rem"  }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1
            }}
            >
            LIBRARY MANAGEMENT SYSTEM
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountBoxIcon fontSize='large' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuList>
              {settings.map((setting) => (
                <MenuItem onClick={setting[2]}>
                  <ListItemIcon>
                    {setting[0]}
                  </ListItemIcon>
                  <ListItemText>{setting[1]}</ListItemText>
                </MenuItem>
              ))}
              </MenuList>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        
      </Box>
    </Box>
  );
}

export default DrawerAppBar;