import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCheckCookiesExpired } from '../../hooks/authorization';
import { useAppSelector } from '../../hooks/redux';
import {
  BadRequestInterface,
  SignInBodyInterface,
  SignUpBodyInterface,
} from '../../utils/interfaces';
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

function SignUp(): React.ReactElement {
  const { isAuth, login, userName, token, userId } = useAppSelector((state) => state.globalReducer);
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(['token', 'name']);
  const [signIn, { isLoading: isSignInLoading }] = usersAPI.useSignInMutation();
  const [signUp, { isLoading: isSignUpLoading }] = usersAPI.useSignUpMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpBodyInterface>({ mode: 'onSubmit', reValidateMode: 'onChange' });

  useCheckCookiesExpired();

  function handleErrors(error: BadRequestInterface) {
    console.log('signUp failed!: ', error);
    if (error.statusCode === 400) {
      console.log('Found empty field! (error from SignUp - 99%)');
    }
    if (error.statusCode === 403) {
      console.log('User was not found or password was wrong! (error from SignIn)');
    }
    if (error.statusCode === 409) {
      console.log('User login already exists! (error from SignUp)');
    } else if (error.statusCode < 200 || error.statusCode >= 300) {
      console.log('This error code was not processed');
    }
  }

  function onSignUp(data: SignUpBodyInterface) {
    signUp(data)
      .unwrap()
      .then(async (response) => {
        if (response) {
          const body: SignInBodyInterface = { login: data.login, password: data.password };

          signIn(body)
            .unwrap()
            .then((res) => {
              if (res?.token) {
                console.log('signIn successful!: ', res);
                setCookie('token', res.token, { maxAge: 300 });
                setCookie('name', data.name, { maxAge: 300 });
                reset();
                navigate('/boards');
              }
            });
        }
      })
      .catch((error: BadRequestInterface) => {
        handleErrors(error);
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
        Sign Up for Free
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
          label="Name"
          id="signup-form__name"
          type="text"
          helperText={errors?.name?.message}
          sx={style.input}
          fullWidth
          {...register('name', {
            required: 'Required field',
            minLength: {
              value: 2,
              message: 'Minimum 2 symbols',
            },
          })}
        />
        <TextField
          label="Login"
          id="signup-form__login"
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
          id="signup-form__password"
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
          className="signup-form__submit-btn"
        >
          Get started
        </Button>
        <button
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            console.log('cookie.token: ', cookie.token);
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

export default SignUp;
