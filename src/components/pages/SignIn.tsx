// TODO: Add spinner while waiting for server response

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { BadRequestInterface, SignInBodyInterface } from '../../utils/interfaces';
import { usersAPI } from '../../utils/usersService';

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
  const [signIn, {}] = usersAPI.useSignInMutation();
  const { isAuth, login, userName, token, userId } = useAppSelector((state) => state.globalReducer);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInBodyInterface>({ mode: 'onSubmit', reValidateMode: 'onChange' });

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
          setCookies('token', res.token);
          reset();
          navigate('/boards');
        }
      })
      .catch((error: BadRequestInterface) => {
        handleErrors(error);
      });
  }

  if (isAuth) {
    return <Navigate to="/boards" replace></Navigate>;
  }

  return (
    <Container maxWidth="lg" sx={style.container}>
      <Typography variant="h5" sx={{ margin: '0.8em' }}>
        Welcome Back!
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
          label="Login"
          id="signin-form__login"
          type="text"
          helperText={errors?.login?.message}
          sx={style.input}
          fullWidth
          {...register('login', {
            required: 'Required field',
            minLength: {
              value: 2,
              message: 'Minimum 2 symbols',
            },
          })}
        />
        <TextField
          label="Password"
          id="signin-form__password"
          type="password"
          helperText={errors?.password?.message}
          sx={style.input}
          fullWidth
          {...register('password', {
            required: 'Required field',
            pattern: {
              value: new RegExp(/(?=.*[0-9])(?=.*[a-z])[0-9!@#$%^&*a-zA-Z]{6,}/g),
              message: '6 symbols (letters + digits)',
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
          Sign In
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
