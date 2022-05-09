import React, { useCallback, useState, useEffect } from 'react';
import update from 'immutability-helper';
import { Task } from './Task';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
interface Task {
  id: number;
  text: string;
}

interface Props {
  column: {
    id?: number | Date;
    name?: string;
    description?: string;
  };
}

const Column: React.FC<Props> = ({ column }) => {
  const { tasks } = useAppSelector((state) => state.boardsReducer);
  const { createNewTaskList } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => setShouldRender(true), []);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(
        createNewTaskList(
          update(tasks, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, tasks[dragIndex] as Task],
            ],
          })
        )
      );
    },
    [tasks]
  );

  const style = {
    container: {
      maxWidth: '300px',
      border: '1px solid gray',
      padding: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: '#d3e3e3',
    },
    header: {
      color: '#323535',
    },
    btn: {
      backgroundColor: '#797E7D',
      '&:hover': {
        backgroundColor: '#1C9D86',
      },
      alignSelf: 'flex-end',
      padding: 0,
    },
  };

  return (
    <>
      {shouldRender && (
        <Box sx={style.container}>
          <div style={style.header}>
            <Typography variant="h5">{column.name}</Typography>
            <Typography variant="body1">{column.description}</Typography>
          </div>
          {tasks.map((task, index) => (
            <Task key={task.id} id={task.id} text={task.text} index={index} moveCard={moveCard} />
          ))}
          <Button
            variant="contained"
            sx={style.btn}
            onClick={() => {
              console.log('create task');
            }}
          >
            +
          </Button>
        </Box>
      )}
    </>
  );
};

export default Column;
