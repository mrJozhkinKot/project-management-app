import React from 'react';
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
import '../../i18n';
import { useTranslation } from 'react-i18next';

function Header(): React.ReactElement {
  const { t, i18n } = useTranslation();
  const isAuth = false;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
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
                    value={i18n.language}
                    onChange={onChange}
                  >
                    <MenuItem value="en">EN</MenuItem>
                    <MenuItem value="ru">RU</MenuItem>
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
                  value={i18n.language}
                  onChange={onChange}
                >
                  <MenuItem value="en">EN</MenuItem>
                  <MenuItem value="ru">RU</MenuItem>
                </Select>
              </FormControl>
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/editprofile');
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {t('edit_profile')}
              </Button>
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/modalboard');
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {t('create_new_board')}
              </Button>
            </Box>
            <Button
              onClick={() => navigate('/welcome')}
              variant="contained"
              size="small"
              style={style.buttonContained}
            >
              {t('sign_out')}
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
                  <InputLabel id="select-label"></InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    sx={{ border: '1px solid #fff', height: '2rem' }}
                    value={i18n.language}
                    onChange={onChange}
                  >
                    <MenuItem value="en">EN</MenuItem>
                    <MenuItem value="ru">RU</MenuItem>
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
                  value={i18n.language}
                  onChange={onChange}
                >
                  <MenuItem value="en">EN</MenuItem>
                  <MenuItem value="ru">RU</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              onClick={() => navigate('/signin')}
              variant="contained"
              size="small"
              style={style.buttonContained}
              sx={{ mr: '10px' }}
            >
              {t('sign_in')}
            </Button>
            <Button
              onClick={() => navigate('/signup')}
              variant="outlined"
              size="small"
              style={style.buttonOutlined}
            >
              {t('sign_up')}
            </Button>
          </Toolbar>
        )}
      </Container>
    </AppBar>
  );
}

export default Header;
