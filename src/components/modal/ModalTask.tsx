import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { tasksAPI } from '../../utils/tasksService';
import { useTranslation } from 'react-i18next';

const defaultValues = {
  title: '',
  description: '',
};
const theme = createTheme({
  palette: {
    primary: {
      main: '#E36655',
    },
  },
});

const style = {
  box: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: '#f0ede9',
    border: '1px solid #20B298',
    boxShadow: 24,
    p: 4,
  },
  input: {
    margin: '0.5rem 0',
    width: 450,
    '& .focus': {
      borderColor: 'orange',
    },
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    alignItems: 'center',
  },
  icon: {
    color: '#20B298',
    cursor: 'pointer',
    marginLeft: '.5rem',
    '&:hover': {
      color: '#E36655',
    },
  },
  btn: {
    backgroundColor: '#20B298',
    display: 'block',
    padding: '0.5rem 1rem',
  },
};

const ModalTask = () => {
  const [valueTitle, setValueTitle] = useState('');
  const [valueDescription, setValueDescription] = useState('');
  const [valueUserId, setValueUserId] = useState('28322c59-b63c-4d3e-88f0-393d70f382b3');

  const dispatch = useAppDispatch();
  const { setIsModalTask } = boardsSlice.actions;
  const { isModalTask, currentColumnId } = useAppSelector((state) => state.boardsReducer);
  const [createTask, {}] = tasksAPI.useCreateTasksMutation();
  const { id } = useParams();
  const { data: tasks } = tasksAPI.useGetTasksQuery([id as string, currentColumnId]);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues });

  const handleClose = () => {
    dispatch(setIsModalTask(false));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = () => {
    createTask([
      id as string,
      currentColumnId,
      {
        title: valueTitle,
        description: valueDescription,
        order: tasks?.length || 0,
        userId: valueUserId,
      },
    ]);
    handleClose();
  };

  const onClickAddUserBtn = () => {
    setValueUserId('1');
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Modal
          open={isModalTask}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.box}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t('сreate_a_new_task')}:
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="title_input"
                label={t('new_task')}
                multiline
                rows={2}
                sx={style.input}
                {...register('title', { required: t('enter_the_title') })}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValueTitle(event.target.value);
                }}
              />
              <TextField
                id="descrtption_input"
                label={t('enter_description')}
                multiline
                rows={4}
                sx={style.input}
                {...register('description', { required: t('enter_the_description') })}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValueDescription(event.target.value);
                }}
              />
              <div style={style.btnContainer}>
                <Button type="submit" variant="contained" size="small" style={style.btn}>
                  {t('create')}
                </Button>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {t('user_name')}
                  <PersonAddIcon sx={style.icon} onClick={onClickAddUserBtn} />
                </div>
              </div>
            </form>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default ModalTask;
