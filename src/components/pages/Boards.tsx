import React, { Fragment } from 'react';
import BoardList from '../boards/BoardList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ModalBoard from '../modal/ModalBoard';
import { boardsSlice } from '../../reducers/BoardsSlice';
<<<<<<< HEAD
import { useAppDispatch } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
=======
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Spinner from '../spinner/Spinner';
import ConfirmBoardModal from '../modal/ConfirmBoardModal';
>>>>>>> develop

const Boards = () => {
  const { setIsModalBoard } = boardsSlice.actions;
  const dispatch = useAppDispatch();
<<<<<<< HEAD
  const { t } = useTranslation();
=======
  const { isLoading } = useAppSelector((state) => state.boardsReducer);
>>>>>>> develop

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
<<<<<<< HEAD
  return (
    <Fragment>
      <Box>
        <Button variant="contained" sx={style} onClick={onClickCreateBtn}>
          {t('create_board')}
        </Button>
        <BoardList />
        <ModalBoard />
      </Box>
    </Fragment>
  );
=======

  if (isLoading) {
    return <Spinner />;
  } else {
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
  }
>>>>>>> develop
};

export default Boards;
