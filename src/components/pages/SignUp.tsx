// TODO: Add spinner while waiting for server response
// TODO: Add token processing (save it into cookies)
// TODO: Change the global var 'isAuth'

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignUpBodyInterface, SignInBodyInterface } from '../../utils/interfaces';
import { signIn, signUp } from '../../utils/serverAPI';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

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
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpBodyInterface>({ mode: 'onSubmit', reValidateMode: 'onChange' });

  function onSignUp(data: SignUpBodyInterface) {
    signUp(data)
      .then(async (response) => {
        if (response) {
          const body: SignInBodyInterface = { login: data.login, password: data.password };

          await signIn(body).then((res) => {
            if (res) {
              console.log('signIn successful!: ', res);
              navigate('/boards');
            }
          });
        }
      })
      .catch((error) => {
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
      });

    reset();
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
    </Container>
  );
}

export default SignUp;
