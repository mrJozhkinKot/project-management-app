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
import { ColumnDraftInterface, TaskDraftInterface, TaskInterface } from '../../utils/interfaces';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useParams } from 'react-router-dom';
import { tasksAPI } from '../../utils/tasksService';
import { columnsAPI } from '../../utils/columnsService';

interface ColumnProps {
  column: ColumnDraftInterface;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
}
interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Column: React.FC<ColumnProps> = ({ column, index, moveColumn }) => {
  const { reorderTaskList, setIsModalTask, setCurrentColumnId } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const [shouldRender, setShouldRender] = useState(false);
  const { id } = useParams();
  const { data: tasks } = tasksAPI.useGetTasksQuery([id as string, column.id]);
  const [deleteColumn, {}] = columnsAPI.useDeleteColumnMutation();

  useEffect(() => setShouldRender(true), []);
  //const tasks = columns[index].tasks;
  const moveTask = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      // dispatch(
      //   reorderTaskList(
      //     update(tasks, {
      //       $splice: [
      //         [dragIndex, 1],
      //         [hoverIndex, 0, tasks[dragIndex] as TaskDraftInterface],
      //       ],
      //     })
      //   )
      // );
    },
    [tasks, reorderTaskList, dispatch]
  );

  const onClickCreateBtn = () => {
    dispatch(setCurrentColumnId(column.id));
    dispatch(setIsModalTask(true));
  };

  const onClickDeleteBtn = () => {
    deleteColumn([id as string, column.id]);
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
    btnContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    btn: {
      color: '#797E7D',
      '&:hover': {
        color: '#1C9D86',
      },
      alignSelf: 'flex-end',
      padding: 0,
      cursor: 'pointer',
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
          {tasks &&
            tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} moveTask={moveTask} column={column} />
            ))}
          <div style={style.btnContainer}>
            <DeleteForeverIcon
              sx={{
                ...style.btn,
                '&:hover': {
                  color: '#E36655',
                },
              }}
              onClick={onClickDeleteBtn}
            />
            <AddBoxIcon sx={style.btn} onClick={onClickCreateBtn} />
          </div>
        </Box>
      )}
    </>
  );
};

export default Column;
