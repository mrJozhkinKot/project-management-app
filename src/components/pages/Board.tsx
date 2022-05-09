import Button from '@mui/material/Button';
import React, { Fragment } from 'react';
import ColumnList from '../boards/ColumnList';

const Board: React.FC = () => {
  const style = {
    margin: '2rem',
    backgroundColor: '#20B298',
    '&:hover': {
      backgroundColor: '#1C9D86',
    },
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        sx={style}
        onClick={() => {
          console.log('create column');
        }}
      >
        Create Column
      </Button>
      <ColumnList />
    </Fragment>
  );
};

export default Board;
