import React, { useCallback, useState, useEffect, useRef } from 'react';
import update from 'immutability-helper';
import { Task } from './Task';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { ItemTypes } from './ItemTypes';
interface TaskDraftInterface {
  id: string;
  title: string;
  order?: number;
  description?: string;
  userId?: string;
  files?: FileInterface[];
}
export interface FileInterface {
  filename: string;
  fileSize: number;
}
interface ColumnProps {
  column: {
    id: string;
    title: string;
    order: number;
    tasks: TaskDraftInterface[];
  };
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
}
interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Column: React.FC<ColumnProps> = ({ column, index, moveColumn }) => {
  const { columns } = useAppSelector((state) => state.boardsReducer);
  const { reorderTaskList, setIsModalTask, setColumn } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => setShouldRender(true), []);
  const tasks = columns[index].tasks;
  const moveTask = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(
        reorderTaskList(
          update(tasks, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, tasks[dragIndex] as TaskDraftInterface],
            ],
          })
        )
      );
    },
    [tasks, reorderTaskList, dispatch]
  );

  const onClickCreateBtn = () => {
    dispatch(setIsModalTask(true));
    dispatch(setColumn(column));
  };

  const style = {
    container: {
      maxWidth: '300px',
      border: '1px solid gray',
      padding: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: '#d3e3e3',
      cursor: 'move',
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

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.COLUMN,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveColumn(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COLUMN,
    item: () => {
      const id = column.id;
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <>
      {shouldRender && (
        <Box ref={ref} sx={{ ...style.container, opacity }} data-handler-id={handlerId}>
          <div style={style.header}>
            <Typography variant="h5">{column.title}</Typography>
          </div>
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} moveTask={moveTask} column={column} />
          ))}
          <Button variant="contained" sx={style.btn} onClick={onClickCreateBtn}>
            +
          </Button>
        </Box>
      )}
    </>
  );
};

export default Column;
