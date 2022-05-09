import React, { useCallback, useState, useEffect } from 'react';
import update from 'immutability-helper';
import { Task } from './Task';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
  const [cards, setCards] = useState([
    { id: 1, text: 'task1' },
    { id: 2, text: 'task2' },
    { id: 3, text: 'task3' },
    { id: 4, text: 'task4' },
    { id: 5, text: 'task5' },
  ]);
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => setShouldRender(true), []);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Task[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Task],
        ],
      })
    );
  }, []);

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
          {cards.map((task, index) => (
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
