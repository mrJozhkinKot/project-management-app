import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCheckCookiesExpired } from '../../hooks/authorization';
import { useAppSelector } from '../../hooks/redux';
import { BadRequestInterface, SignInBodyInterface } from '../../utils/interfaces';
import { usersAPI } from '../../utils/usersService';
import Spinner from '../spinner/Spinner';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    '& > :not(style)': { m: 1, width: '25ch' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    display: 'block',
  },
  btn: {
    margin: '2rem',
    backgroundColor: '#20B298',
    '&:hover': {
      backgroundColor: '#1C9D86',
    },
  },
};

function SignIn(): React.ReactElement {
  const [cookies, setCookies] = useCookies(['token']);
  const [signIn, { isLoading }] = usersAPI.useSignInMutation();
  const { isAuth, login, userName, token, userId } = useAppSelector((state) => state.globalReducer);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInBodyInterface>({ mode: 'onSubmit', reValidateMode: 'onChange' });

  useCheckCookiesExpired();

  function handleErrors(error: BadRequestInterface) {
    console.log('signIn failed!: ', error);
    if (error.statusCode === 400) {
      console.log('Found empty field!');
    }
    if (error.statusCode === 403) {
      console.log('User was not found or password was wrong!');
    } else if (error.statusCode < 200 || error.statusCode >= 300) {
      console.log('This error code was not processed');
    }
  }

  function onSignIn(userData: SignInBodyInterface) {
    signIn(userData)
      .unwrap()
      .then(async (res) => {
        if (res?.token) {
          setCookies('token', res.token, { maxAge: 300 });
          reset();
          navigate('/boards');
        }
      })
      .catch((error: BadRequestInterface) => {
        handleErrors(error);
      });
  }

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (isAuth) {
    return <Navigate to="/boards" replace></Navigate>;
  }

  return (
    <Container maxWidth="lg" sx={style.container}>
      <Typography variant="h5" sx={{ margin: '0.8em' }}>
        {t('welcome_back')}!
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSignIn)}
        className="signin-form"
        sx={style.form}
        noValidate
        autoComplete="on"
      >
        <TextField
          label={t('login')}
          id="signin-form__login"
          type="text"
          helperText={errors?.login?.message}
          sx={style.input}
          fullWidth
          {...register('login', {
            required: t('required_field'),
            minLength: {
              value: 2,
              message: t('minimum_2_symbols'),
            },
          })}
        />
        <TextField
          label={t('password')}
          id="signin-form__password"
          type="password"
          helperText={errors?.password?.message}
          sx={style.input}
          fullWidth
          {...register('password', {
            required: t('required_field'),
            pattern: {
              value: new RegExp(/(?=.*[0-9])(?=.*[a-z])[0-9!@#$%^&*a-zA-Z]{6,}/g),
              message: t('6_symbols'),
            },
          })}
        />
        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={style.btn}
          className="signin-form__submit-btn"
        >
          {t('sign_in')}
        </Button>
        <button
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            console.log('cookies.token: ', cookies.token);
            console.log('token: ', token);
            console.log('isAuth: ', isAuth);
            console.log('login: ', login);
            console.log('userId: ', userId);
            console.log('userName: ', userName);
          }}
        >
          Show user data
        </button>
      </Box>
    </Container>
  );
}

export default SignIn;
