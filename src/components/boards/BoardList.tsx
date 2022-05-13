import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import Board from './BoardItem';
import Grid from '@mui/material/Grid';

const BoardList = () => {
  const { boards } = useAppSelector((state) => state.boardsReducer);

  const style = {
    container: {
      padding: '1rem',
      marginBottom: '10rem',
    },
  };

  return (
    <div>
      <Grid sx={style.container} container spacing={4} pl={4} pr={4}>
        {boards.map((board) => (
          <Grid key={board.id} item xs={12} sm={6} md={4} lg={3}>
            <Board board={board} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BoardList;
