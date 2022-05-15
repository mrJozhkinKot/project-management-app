import React from 'react';
import Board from './BoardItem';
import Grid from '@mui/material/Grid';
import { boardsAPI } from '../../utils/boardService';
import Spinner from '../spinner/Spinner';

const BoardList = () => {
  const { data: boards, error, isLoading } = boardsAPI.useGetBoardsQuery(10);
  const style = {
    container: {
      padding: '1rem',
      marginBottom: '10rem',
    },
  };

  return (
    <div>
      <Grid sx={style.container} container spacing={4} pl={4} pr={4}>
        {isLoading && <Spinner />}
        {error && <p style={{ margin: 'auto' }}>Something get wrong</p>}
        {boards &&
          boards.map((board) => (
            <Grid key={board.id} item xs={12} sm={6} md={4} lg={3}>
              <Board board={board} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default BoardList;
