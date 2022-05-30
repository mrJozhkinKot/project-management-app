import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { createTheme, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { boardsAPI } from '../../utils/boardService';
import { useTranslation } from 'react-i18next';
import { handleBoardsErrors, notifySuccess } from '../toasts/toasts';
import { ParsedErrorInterface } from '../../utils/interfaces';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

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
  list: {
    position: 'absolute' as const,
    backgroundColor: '#f0ede9',
    border: '1px solid #20B298',
    padding: '0 2rem 0 0',
    top: '250px',
    left: '500px',
    maxHeight: '150px',
    overflowY: 'scroll' as const,
  },
  listUi: {
    listStyle: 'none' as const,
    overflow: 'hidden',
    cursor: 'pointer',
  },
  closeIcon: {
    cursor: 'pointer',
    float: 'right',
    marginTop: '-20px',
    marginRight: '-20px',
    width: '20px',
  },
};

const ModalEditTask = () => {
  const [cookies] = useCookies(['token']);
  const { setIsModalEditTask } = boardsSlice.actions;
  const { isModalEditTask, currentColumnId, currentBoardId, task } = useAppSelector(
    (state) => state.boardsReducer
  );
  const [valueTitle, setValueTitle] = useState(task?.title || '');
  const [valueDescription, setValueDescription] = useState(task?.description || '');
  const [updateTask, {}] = boardsAPI.useUpdateTaskMutation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { id } = useParams();
  const { data: users } = boardsAPI.useGetUsersQuery(cookies.token);
  const { data: user } = boardsAPI.useGetUserQuery([cookies.token, task?.userId]);
  const [valueUserId, setValueUserId] = useState(user?.id);
  const [valueUserName, setValueUserName] = useState(user?.name);
  const [isVisibleUserList, setIsVisibleUserList] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues });

  const handleClose = () => {
    dispatch(setIsModalEditTask(false));
  };

  useEffect(() => {
    setValueUserName(user?.name);
    setValueUserId(user?.id);
  }, [isModalEditTask, user]);

  const onClickAddUserBtn = () => {
    setIsVisibleUserList(!isVisibleUserList);
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
    if (task && valueUserId) {
      updateTask([
        cookies.token,
        currentBoardId,
        currentColumnId,
        { ...task, title: valueTitle, description: valueDescription, userId: valueUserId },
      ])
        .unwrap()
        .then((response) => {
          if (response) {
            notifySuccess('Task updated successfully!');
          }
        })
        .catch((error) => {
          const parsedError: ParsedErrorInterface = JSON.parse(JSON.stringify(error));
          handleBoardsErrors(parsedError, 'columns');
        })
        .finally(() => handleClose());
    }
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
            <CloseIcon sx={style.closeIcon} onClick={handleClose} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t('edit_task')}:
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="title_input"
                label={t('new_task')}
                value={valueTitle}
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
                  {valueUserName}
                  <PersonAddIcon sx={style.icon} onClick={onClickAddUserBtn} />
                </div>
              </div>
            </form>
            <div style={{ ...style.list, display: isVisibleUserList ? 'block' : 'none' }}>
              <ul style={style.listUi}>
                {users &&
                  users.map((user) => (
                    <li
                      key={user.id}
                      onClick={() => {
                        setValueUserName(user.name);
                        setValueUserId(user.id);
                        setIsVisibleUserList(false);
                        if (task && valueUserId) {
                          updateTask([
                            cookies.token,
                            id as string,
                            currentColumnId,
                            { ...task, userId: valueUserId },
                          ]);
                        }
                      }}
                    >
                      {user.name}
                    </li>
                  ))}
              </ul>
            </div>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default ModalEditTask;
