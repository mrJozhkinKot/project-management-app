import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCheckCookiesExpired } from '../../hooks/authorization';
import { useAppSelector } from '../../hooks/redux';
import { ParsedErrorInterface, SignInBodyInterface } from '../../utils/interfaces';
import { usersAPI } from '../../utils/usersService';
import Spinner from '../spinner/Spinner';
import { notifyAuthWarning } from '../toasts/toasts';

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
  const [, setCookies] = useCookies(['token']);
  const [signIn, { isLoading }] = usersAPI.useSignInMutation();
  const { isAuth } = useAppSelector((state) => state.globalReducer);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInBodyInterface>({ mode: 'onSubmit', reValidateMode: 'onChange' });

  useCheckCookiesExpired();

  function handleErrors(error: ParsedErrorInterface) {
    const data = error.data;

    if (error.status === 400) {
      notifyAuthWarning('Found empty field!');
    }
    if (error.status === 403) {
      notifyAuthWarning('Invalid password or login!');
    } else if (error.status < 200 || error.status >= 300) {
      notifyAuthWarning(data.message);
    }
  }

  function onSignIn(userData: SignInBodyInterface) {
    signIn(userData)
      .unwrap()
      .then(async (res) => {
        if (res?.token) {
          setCookies('token', res.token, { maxAge: 600 });
        }
      })
      .catch((error) => {
        const parsedError: ParsedErrorInterface = JSON.parse(JSON.stringify(error));
        handleErrors(parsedError);
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
      </Box>
      <ToastContainer />
    </Container>
  );
}

export default SignIn;
