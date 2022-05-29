import Grid from '@mui/material/Grid';
import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { boardsAPI } from '../../utils/boardService';
import Spinner from '../spinner/Spinner';
import Board from './BoardItem';
import { useTranslation } from 'react-i18next';

const BoardList = () => {
  const { token } = useAppSelector((state) => state.globalReducer);
  const { data: boards, error, isLoading } = boardsAPI.useGetBoardsQuery(token);
  const { t } = useTranslation();
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
        {error && <p style={{ margin: 'auto' }}>{t('something_get_wrong')}</p>}
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
