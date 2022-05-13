import React, { Fragment } from 'react';
import BoardList from '../boards/BoardList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ModalBoard from '../modal/ModalBoard';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useAppDispatch } from '../../hooks/redux';

const Boards: React.FC = () => {
  const { setIsModalBoard } = boardsSlice.actions;
  const dispatch = useAppDispatch();

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
  return (
    <Fragment>
      <Box>
        <Button variant="contained" sx={style} onClick={onClickCreateBtn}>
          Create Board
        </Button>
        <BoardList />
        <ModalBoard />
      </Box>
    </Fragment>
  );
};

export default Boards;
