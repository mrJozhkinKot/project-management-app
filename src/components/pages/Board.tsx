import Button from '@mui/material/Button';
import React, { Fragment } from 'react';
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

const Board: React.FC = () => {
  const { setIsModalColumn } = boardsSlice.actions;
  const { currentColumnId, currentTaskId } = useAppSelector((state) => state.boardsReducer);
  const { isAuth } = useAppSelector((state) => state.globalReducer);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useCheckCookiesExpired();

  const style = {
    margin: '2rem',
    backgroundColor: '#20B298',
    '&:hover': {
      backgroundColor: '#1C9D86',
    },
  };

  if (!isAuth) {
    return <Navigate to="/signin" replace></Navigate>;
  }

  return (
    <Fragment>
      <Button
        variant="contained"
        sx={style}
        onClick={() => {
          dispatch(setIsModalColumn(true));
        }}
      >
        {t('create_column')}
      </Button>
      <ColumnList />
      <ModalColumn />
      {currentColumnId && <ModalTask />}
      {currentColumnId && currentTaskId && <ModalEditTask />}
      <ConfirmColumnModal />
      <ConfirmTaskModal />
    </Fragment>
  );
};

export default Board;
