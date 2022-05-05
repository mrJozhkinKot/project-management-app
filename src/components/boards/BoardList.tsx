import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import Board from './Board';
import Grid from '@mui/material/Grid';

const BoardList = () => {
  //const classes = useStyles();
  const { boards } = useAppSelector((state) => state.boardsReducer);
  return (
    <div>
      <Grid container spacing={4} pl={4} pr={4}>
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
