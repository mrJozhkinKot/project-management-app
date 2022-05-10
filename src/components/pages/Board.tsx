import Button from '@mui/material/Button';
import React, { Fragment } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import ColumnList from '../boards/ColumnList';
import ModalColumn from '../modal/ModalColumn';
import ModalTask from '../modal/ModalTask';

const Board: React.FC = () => {
  const { setIsModalColumn } = boardsSlice.actions;
  const dispatch = useAppDispatch();

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
          dispatch(setIsModalColumn(true));
        }}
      >
        Create Column
      </Button>
      <ColumnList />
      <ModalColumn />
      <ModalTask />
    </Fragment>
  );
};

export default Board;
