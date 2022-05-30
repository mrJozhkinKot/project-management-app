import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { useCheckCookiesExpired } from '../../hooks/authorization';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import BoardList from '../boards/BoardList';
import ConfirmBoardModal from '../modal/ConfirmBoardModal';
import ModalBoard from '../modal/ModalBoard';
import Spinner from '../spinner/Spinner';
import { ToastContainer } from 'react-toastify';

const Boards = () => {
  const { setIsModalBoard } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isLoading } = useAppSelector((state) => state.boardsReducer);
  const { isAuth } = useAppSelector((state) => state.globalReducer);

  useCheckCookiesExpired();

  const onClickCreateBtn = () => {
    dispatch(setIsModalBoard(true));
  };

  const style = {
    margin: '2rem',
    backgroundColor: '#20B298',
    '&:hover': {
      backgroundColor: '#1C9D86',
    },
  };

  if (!isAuth) {
    return <Navigate to="/welcome" replace></Navigate>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Box>
        <Button variant="contained" sx={style} onClick={onClickCreateBtn}>
          {t('create_board')}
        </Button>
        <BoardList />
        <ModalBoard />
        <ConfirmBoardModal />
        <ToastContainer />
      </Box>
    </Fragment>
  );
};

export default Boards;
