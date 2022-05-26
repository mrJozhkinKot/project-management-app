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
import { useCheckCookiesExpired } from '../../hooks/authorization';
import { useAppSelector } from '../../hooks/redux';
import {
  BadRequestInterface,
  SignUpBodyInterface,
  UpdateUserInterface,
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

function EditProfile(): React.ReactElement {
  const { isAuth, login, userName, token, userId } = useAppSelector((state) => state.globalReducer);
  const [cookie, setCookie] = useCookies(['token', 'name']);
  const [updateUser, { isLoading: isUpdateUserLoading }] = usersAPI.useUpdateUserMutation();
  // const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<SignUpBodyInterface>({ mode: 'onSubmit', reValidateMode: 'onChange' });

  useCheckCookiesExpired();

  function handleErrors(error: BadRequestInterface) {
    console.log('updateUser failed!: ', error);
    if (error.statusCode === 400) {
      console.log('Found incorrect id');
    } else if (error.statusCode < 200 || error.statusCode >= 300) {
      console.log('This error code was not processed');
    }
  }

  function handleEditProfile(data: UpdateUserInterface) {
    updateUser([token, userId, data])
      .unwrap()
      .then(async (response) => {
        if (response?.id) {
          console.log('updateUser successful!: ', response);
          setCookie('token', token, { maxAge: 300 });
          setCookie('name', response.name, { maxAge: 300 });
          resetField('password');
          // alert('updateUser successful!');
          // navigate('/boards');
        }
      })
      .catch((error: BadRequestInterface) => {
        handleErrors(error);
      });
  }

  if (isUpdateUserLoading) {
    return <Spinner></Spinner>;
  }

  if (!isAuth) {
    return <Navigate to="/welcome" replace></Navigate>;
  }

  return (
    <Container maxWidth="lg" sx={style.container}>
      <Typography variant="h5" sx={{ margin: '0.8em' }}>
        {/* {t('profile_settings')} */}
        Profile settings
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(handleEditProfile)}
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
          defaultValue={userName}
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
          defaultValue={login}
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
          {t('save')}
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

export default EditProfile;
