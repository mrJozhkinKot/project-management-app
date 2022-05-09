import React, { useCallback } from 'react';
import update from 'immutability-helper';
import Grid from '@mui/material/Grid';
import Column from './Column';
import { useAppSelector } from '../../hooks/redux';

interface Column {
  id?: number | Date;
  name?: string;
  description?: string;
}

const ColumnList = () => {
  const { columns } = useAppSelector((state) => state.boardsReducer);

  const style = {
    container: {
      padding: '1rem',
      marginBottom: '10rem',
    },
  };

  const moveColumn = useCallback((dragIndex: number, hoverIndex: number) => {
    // setCards((prevColumn: Column[]) =>
    //   update(prevColumn, {
    //     $splice: [
    //       [dragIndex, 1],
    //       [hoverIndex, 0, prevColumn[dragIndex] as Column],
    //     ],
    //   })
    // );
  }, []);

  return (
    <div>
      <Grid sx={style.container} container spacing={4} pl={4} pr={4}>
        {columns.map((column) => (
          <Grid key={Number(column.id)} item xs={12} sm={6} md={4} lg={3}>
            <Column column={column} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ColumnList;
