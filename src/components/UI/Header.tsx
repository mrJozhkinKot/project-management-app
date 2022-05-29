import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
} from '@mui/material';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import '../../i18n';
import { boardsSlice } from '../../reducers/BoardsSlice';

const style = {
  container: {
    backgroundColor: '#323535',
    transition: 'all 0.5s',
  },
  sticky: {
    backgroundColor: '#494E4D',
    transition: 'all 0.5s',
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

function Header(): React.ReactElement {
  const { isAuth } = useAppSelector((state) => state.globalReducer);
  const [, , deleteCookies] = useCookies(['token']);
  const { t, i18n } = useTranslation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [sticky, setSticky] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const { setIsModalBoard } = boardsSlice.actions;
  const dispatch = useAppDispatch();

  const stickyHeader = () => {
    if (window.pageYOffset > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  window.addEventListener('scroll', stickyHeader);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const onChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };
  return (
    <AppBar position="sticky" style={sticky ? style.sticky : style.container}>
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
                    value={i18n.language}
                    onChange={onChange}
                  >
                    <MenuItem value="en">EN</MenuItem>
                    <MenuItem value="ru">RU</MenuItem>
                  </Select>
                </FormControl>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate('/editprofile');
                    }}
                  >
                    {t('edit_profile')}
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button
                    onClick={() => {
                      handleCloseNavMenu();
                      dispatch(setIsModalBoard(true));
                      navigate('/boards');
                    }}
                  >
                    {t('create_new_board')}
                  </Button>
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
                sx={style.btn}
              >
                {t('edit_profile')}
              </Button>
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  dispatch(setIsModalBoard(true));
                  navigate('/boards');
                }}
                sx={style.btn}
              >
                {t('create_new_board')}
              </Button>
            </Box>
            <Button
              onClick={() => {
                navigate('/welcome');
              }}
              variant="outlined"
              size="small"
              sx={{ ...style.buttonOutlined, marginRight: '10px' }}
            >
              Main page
            </Button>
            <Button
              onClick={() => {
                deleteCookies('token');
                navigate('/welcome');
              }}
              variant="contained"
              size="small"
              sx={style.buttonContained}
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
                  <InputLabel id="select-label-hamburger"></InputLabel>
                  <Select
                    labelId="select-label-hamburger"
                    id="select-hamburger"
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
              sx={style.buttonContained}
            >
              {t('sign_in')}
            </Button>
            <Button
              onClick={() => navigate('/signup')}
              variant="outlined"
              size="small"
              sx={style.buttonOutlined}
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
