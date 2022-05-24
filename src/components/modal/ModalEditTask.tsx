import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { createTheme, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
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

const ModalEditTask = () => {
  const { setIsModalEditTask } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { isModalEditTask, currentColumnId, currentBoardId, task } = useAppSelector(
    (state) => state.boardsReducer
  );
  const { id } = useParams();
  const [valueTitle, setValueTitle] = useState(task?.title || '');
  const [valueDescription, setValueDescription] = useState(task?.description || '');
  const [updateTask, {}] = tasksAPI.useUpdateTaskMutation();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues });

  const handleClose = () => {
    dispatch(setIsModalEditTask(false));
  };

  const onClickAddUserBtn = () => {
    if (task) {
      updateTask([id as string, currentColumnId, { ...task, userId: task?.userId || '' }]);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    setValueTitle(task?.title || '');
    setValueDescription(task?.description || '');
  }, [task?.title, task?.description]);

  const onSubmit = () => {
    if (task) {
      updateTask([
        currentBoardId,
        currentColumnId,
        { ...task, title: valueTitle, description: valueDescription },
      ]);
    }
    handleClose();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Modal
          open={isModalEditTask}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.box}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t('edit_task')}:
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="title_input"
                label={t('new_task')}
                value={valueTitle}
                rows={2}
                sx={style.input}
                {...register('title')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValueTitle(event.target.value);
                }}
              />
              <TextField
                id="descrtption_input"
                label={t('enter_description')}
                value={valueDescription}
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
                  {t('save')}
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

export default ModalEditTask;
