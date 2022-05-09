import React, { useCallback, useState } from 'react';
import update from 'immutability-helper';
import { Task } from './Task';

interface Task {
  id: number;
  text: string;
}
const Container = () => {
  const [cards, setCards] = useState([
    { id: 1, text: 'task1' },
    { id: 2, text: 'task2' },
    { id: 3, text: 'task3' },
    { id: 4, text: 'task4' },
    { id: 5, text: 'task5' },
  ]);

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

  return (
    <div>
      {cards.map((task, index) => (
        <Task key={task.id} id={task.id} text={task.text} index={index} moveCard={moveCard} />
      ))}
    </div>
  );
};

export default Container;
