import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { useCheckCookiesExpired } from '../../hooks/authorization';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import ColumnList from '../boards/ColumnList';
import ConfirmColumnModal from '../modal/ConfirmColumnModal';
import ConfirmTaskModal from '../modal/ConfirmTaskModa';
import ModalColumn from '../modal/ModalColumn';
import ModalEditTask from '../modal/ModalEditTask';
import ModalTask from '../modal/ModalTask';
import { ToastContainer } from 'react-toastify';

const Board: React.FC = () => {
  const { setIsModalColumn } = boardsSlice.actions;
  const { currentColumnId, currentTaskId, isModalTask, isModalEditTask } = useAppSelector(
    (state) => state.boardsReducer
  );
  const { isAuth } = useAppSelector((state) => state.globalReducer);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useCheckCookiesExpired();

  const style = {
    container: {
      height: 'calc(100vh - 6rem)',
      flexWrap: 'nowrap' as const,
      overflowX: 'scroll' as const,
      width: '100vw',
    },
    button: {
      margin: '2rem',
      backgroundColor: '#20B298',
      '&:hover': {
        backgroundColor: '#1C9D86',
      },
    },
  };

  if (!isAuth) {
    return <Navigate to="/welcome" replace></Navigate>;
  }

  return (
    <Box sx={style.container}>
      <Button
        variant="contained"
        sx={style.button}
        onClick={() => {
          dispatch(setIsModalColumn(true));
        }}
      >
        {t('create_column')}
      </Button>
      <ColumnList />
      <ModalColumn />
      {currentColumnId && isModalTask && <ModalTask />}
      {currentColumnId && currentTaskId && isModalEditTask && <ModalEditTask />}
      <ConfirmColumnModal />
      <ConfirmTaskModal />
      <ToastContainer />
    </Box>
  );
};

export default Board;
