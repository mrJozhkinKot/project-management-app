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
import {
  ParsedErrorInterface,
  SignInBodyInterface,
  SignUpBodyInterface,
} from '../../utils/interfaces';
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

function SignUp(): React.ReactElement {
  const { isAuth } = useAppSelector((state) => state.globalReducer);
  const [, setCookie] = useCookies(['token', 'name']);
  const [signIn, { isLoading: isSignInLoading }] = usersAPI.useSignInMutation();
  const [signUp, { isLoading: isSignUpLoading }] = usersAPI.useSignUpMutation();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpBodyInterface>({ mode: 'onSubmit', reValidateMode: 'onChange' });

  useCheckCookiesExpired();

  function handleErrors(error: ParsedErrorInterface) {
    const data = error.data;

    if (error.status === 400) {
      notifyAuthWarning(t('found_empty_field'));
    }
    if (error.status === 403) {
      notifyAuthWarning(t('invalid_password_or_login'));
    }
    if (error.status === 409) {
      notifyAuthWarning(t('this_login_already_exists'));
    } else if (error.status < 200 || error.status >= 300) {
      notifyAuthWarning(data.message);
    }
  }

  function onSignUp(data: SignUpBodyInterface) {
    signUp(data)
      .unwrap()
      .then(async (response) => {
        const body: SignInBodyInterface = { login: data.login, password: data.password };

        if (response) {
          signIn(body)
            .unwrap()
            .then((res) => {
              if (res?.token) {
                setCookie('token', res.token, { maxAge: 600 });
                setCookie('name', data.name, { maxAge: 600 });
              }
            });
        }
      })
      .catch((error) => {
        const parsedError: ParsedErrorInterface = JSON.parse(JSON.stringify(error));
        handleErrors(parsedError);
      });
  }

  if (isSignInLoading || isSignUpLoading) {
    return <Spinner></Spinner>;
  }

  if (isAuth) {
    return <Navigate to="/boards" replace></Navigate>;
  }

  return (
    <Container maxWidth="lg" sx={style.container}>
      <Typography variant="h5" sx={{ margin: '0.8em' }}>
        {t('sign_up_for_free')}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSignUp)}
        className="signup-form"
        sx={style.form}
        noValidate
        autoComplete="off"
      >
        <TextField
          label={t('name')}
          id="signup-form__name"
          type="text"
          helperText={errors?.name?.message}
          sx={style.input}
          fullWidth
          {...register('name', {
            required: t('required_field'),
            minLength: {
              value: 2,
              message: t('minimum_2_symbols'),
            },
          })}
        />
        <TextField
          label={t('login')}
          id="signup-form__login"
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
          id="signup-form__password"
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
          className="signup-form__submit-btn"
        >
          {t('get_started')}
        </Button>
      </Box>
      <ToastContainer />
    </Container>
  );
}

export default SignUp;
