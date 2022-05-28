//import update from 'immutability-helper';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useParams } from 'react-router-dom';
import { boardsAPI } from '../../utils/boardService';
import Spinner from '../spinner/Spinner';
import Column from './Column';
import { ToastContainer } from 'react-toastify';

const ColumnList = () => {
  const { id } = useParams();
  const { data: columns, isLoading } = boardsAPI.useGetColumnsQuery(id as string);

  const style = {
    container: {
      padding: '1rem',
      marginBottom: '10rem',
    },
  };

  return (
    <div>
      {isLoading && <Spinner />}
      <Grid sx={style.container} container spacing={4} pl={4} pr={4}>
        {columns &&
          columns.map((column, index) => (
            <Grid key={String(column.id)} item xs={12} sm={6} md={4} lg={3}>
              <Column column={column} index={index} />
            </Grid>
          ))}
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default ColumnList;
