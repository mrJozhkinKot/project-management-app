import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const isAuth = true;
  const [lang, setLang] = useState<string>('EN');
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

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
    btn: {
      color: '#fff',
      display: 'block',
      '&:hover': {
        color: '#20B298',
      },
    },
    buttonContained: {
      backgroundColor: '#20B298',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#1C9D86',
      },
    },
    buttonOutlined: {
      color: '#20B298',
      border: '1px solid #20B298',
      marginLeft: '10px',
      '&:hover': {
        backgroundColor: '#535756',
        border: '1px solid #535756',
      },
    },
    select: {
      color: '#fff',
      border: '1px solid #fff',
      height: '2rem',
      alignItems: 'center',
      marginRigth: '5px',
      '&:hover': {
        backgroundColor: '#535756',
      },
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
                id="menu-appbar-auth"
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
                  <InputLabel id="select-label-hamburger-auth"></InputLabel>
                  <Select
                    labelId="select-label-hamburger-auth"
                    id="select-hamburger-auth"
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
                <InputLabel id="select-label-auth"></InputLabel>
                <Select
                  labelId="select-label-auth"
                  id="select-auth"
                  sx={style.select}
                  value={lang}
                  onChange={onChange}
                >
                  <MenuItem value="EN">EN</MenuItem>
                  <MenuItem value="RU">RU</MenuItem>
                </Select>
              </FormControl>
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/editprofile');
                }}
                sx={style.btn}
              >
                Edit profile
              </Button>
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/modalboard');
                }}
                sx={style.btn}
              >
                Create new board
              </Button>
            </Box>
            <Button
              onClick={() => navigate('/welcome')}
              variant="contained"
              size="small"
              sx={style.buttonContained}
            >
              Sign Out
            </Button>
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
                role="menubar"
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
                  <InputLabel id="select-label-hamburger"></InputLabel>
                  <Select
                    labelId="select-label-hamburger"
                    id="select-hamburger"
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
                  sx={style.select}
                  value={lang}
                  onChange={onChange}
                >
                  <MenuItem value="EN">EN</MenuItem>
                  <MenuItem value="RU">RU</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button
              onClick={() => navigate('/signin')}
              variant="contained"
              size="small"
              sx={style.buttonContained}
            >
              Sign in
            </Button>
            <Button
              onClick={() => navigate('/signup')}
              variant="outlined"
              size="small"
              sx={style.buttonOutlined}
            >
              Sign up
            </Button>
          </Toolbar>
        )}
      </Container>
    </AppBar>
  );
}

export default Header;
