import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useCheckCookiesExpired } from '../../hooks/authorization';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import BoardList from '../boards/BoardList';
import ConfirmBoardModal from '../modal/ConfirmBoardModal';
import ModalBoard from '../modal/ModalBoard';
import Spinner from '../spinner/Spinner';

const Boards = () => {
  const { setIsModalBoard } = boardsSlice.actions;
  const dispatch = useAppDispatch();
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
    return <Navigate to="/signin" replace></Navigate>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Box>
        <Button variant="contained" sx={style} onClick={onClickCreateBtn}>
          Create Board
        </Button>
        <BoardList />
        <ModalBoard />
        <ConfirmBoardModal />
      </Box>
    </Fragment>
  );
};

export default Boards;
