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
  SignUpBodyInterface,
  UpdateUserInterface,
} from '../../utils/interfaces';
import { usersAPI } from '../../utils/usersService';
import Spinner from '../spinner/Spinner';
import { notifyAuthWarning, notifySuccess } from '../toasts/toasts';

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
  const [, setCookie] = useCookies(['token', 'name']);
  const [updateUser, { isLoading: isUpdateUserLoading }] = usersAPI.useUpdateUserMutation();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<SignUpBodyInterface>({ mode: 'onSubmit', reValidateMode: 'onChange' });

  useCheckCookiesExpired();

  function handleErrors(error: ParsedErrorInterface) {
    const data = error.data;

    if (error.status === 400) {
      notifyAuthWarning(t('found_incorrect_id'));
    }
    if (error.status === 401) {
      notifyAuthWarning(t('unauthorized'));
    }
    if (error.status === 500) {
      notifyAuthWarning(t('this_login_already_exists'));
    } else if (error.status < 200 || error.status >= 300) {
      notifyAuthWarning(data.message);
    }
  }

  function handleEditProfile(data: UpdateUserInterface) {
    updateUser([token, userId, data])
      .unwrap()
      .then(async (response) => {
        if (response?.id) {
          setCookie('token', token, { maxAge: 600 });
          setCookie('name', response.name, { maxAge: 600 });
          resetField('password');
          notifySuccess(t('data_changed_successfully'));
        }
      })
      .catch((error) => {
        const parsedError: ParsedErrorInterface = JSON.parse(JSON.stringify(error));
        handleErrors(parsedError);
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
        {t('profile_settings')}
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
      </Box>
      <ToastContainer />
    </Container>
  );
}

export default EditProfile;
