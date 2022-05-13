import React, { Fragment, useEffect } from 'react';
import BoardList from '../boards/BoardList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ModalBoard from '../modal/ModalBoard';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getBoardsThunk } from '../../reducers/ActionBoardsCreater';

const Boards: React.FC = () => {
  const { setIsModalBoard } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.boardsReducer);

  useEffect(() => {
    dispatch(getBoardsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {!isLoading && <BoardList />}
        <ModalBoard />
      </Box>
    </Fragment>
  );
};

export default Boards;
