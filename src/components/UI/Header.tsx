import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Container,
  Typography,
  Toolbar,
  Box,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

function Header(): React.ReactElement {
  const isAuth = false;
  const [lang, setLang] = useState<string>('EN');
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onChange = (event: SelectChangeEvent) => {
    setLang(event.target.value);
  };

  const style = {
    container: {
      backgroundColor: '#323535',
    },
    buttonContained: {
      backgroundColor: '#20B298',
      color: '#fff',
    },
    buttonOutlined: {
      color: '#20B298',
      border: '1px solid #20B298',
    },
  };

  return (
    <AppBar position="sticky" style={style.container}>
      <Container maxWidth="xl">
        {isAuth ? (
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="hamburger-menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <FormControl>
                  <InputLabel id="select-label"></InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    sx={{ border: '1px solid #000', height: '2rem', ml: '15px' }}
                    value={lang}
                    onChange={onChange}
                  >
                    <MenuItem value="EN">EN</MenuItem>
                    <MenuItem value="RU">RU</MenuItem>
                  </Select>
                </FormControl>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Edit profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Create new board</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <FormControl>
                <InputLabel id="select-label"></InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  sx={{
                    color: '#fff',
                    border: '1px solid #fff',
                    height: '2rem',
                    alignItems: 'center',
                    mr: '5px',
                  }}
                  value={lang}
                  onChange={onChange}
                >
                  <MenuItem value="EN">EN</MenuItem>
                  <MenuItem value="RU">RU</MenuItem>
                </Select>
              </FormControl>
              <NavLink to="editprofile">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Edit profile
                </Button>
              </NavLink>
              <NavLink to="modalboard">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Create new board
                </Button>
              </NavLink>
            </Box>
            <NavLink to="welcome">
              <Button variant="contained" size="small" style={style.buttonContained}>
                Sign Out
              </Button>
            </NavLink>
          </Toolbar>
        ) : (
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="hamburger-menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <FormControl>
                  <InputLabel id="select-label"></InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    sx={{ border: '1px solid #fff', height: '2rem' }}
                    value={lang}
                    onChange={onChange}
                  >
                    <MenuItem value="EN">EN</MenuItem>
                    <MenuItem value="RU">RU</MenuItem>
                  </Select>
                </FormControl>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <FormControl>
                <InputLabel id="select-label"></InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  sx={{ color: '#fff', border: '1px solid #fff', height: '2rem' }}
                  value={lang}
                  onChange={onChange}
                >
                  <MenuItem value="EN">EN</MenuItem>
                  <MenuItem value="RU">RU</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <NavLink to="signin">
              <Button
                variant="contained"
                size="small"
                style={style.buttonContained}
                sx={{ mr: '10px' }}
              >
                Sign in
              </Button>
            </NavLink>
            <NavLink to="signup">
              <Button variant="outlined" size="small" style={style.buttonOutlined}>
                Sign up
              </Button>
            </NavLink>
          </Toolbar>
        )}
      </Container>
    </AppBar>
  );
}

export default Header;
