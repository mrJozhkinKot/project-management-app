import React, { useCallback, useState, useEffect, useRef } from 'react';
//import update from 'immutability-helper';
import { Task } from './Task';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { ItemTypes } from './ItemTypes';
import { ColumnDraftInterface } from '../../utils/interfaces';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useParams } from 'react-router-dom';
import { tasksAPI } from '../../utils/tasksService';
import { columnsAPI } from '../../utils/columnsService';
import Input from '@mui/material/Input';

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
  const {
    setIsModalTask,
    setCurrentColumnId,
    setCurrentBoardId,
    setIsColumnEdit,
    setColumnEdited,
    setIsConfirmColumnModal,
  } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { isColumnEdit, columnEdited } = useAppSelector((state) => state.boardsReducer);
  const [shouldRender, setShouldRender] = useState(false);
  const [valueTitle, setValueTitle] = useState('');
  const { id } = useParams();
  const { data: tasks } = tasksAPI.useGetTasksQuery([id as string, column.id]);
  const [updateColumn, {}] = columnsAPI.useUpdateColummnMutation();
  const { data: columns } = columnsAPI.useGetColumnsQuery(id as string);

  useEffect(() => setShouldRender(true), []);
  //const tasks = columns[index].tasks;
  const moveTask = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tasks]
  );

  const onClickCreateBtn = () => {
    dispatch(setCurrentColumnId(column.id));
    dispatch(setIsModalTask(true));
  };

  const onClickDeleteBtn = () => {
    if (id) {
      dispatch(setCurrentBoardId(id));
      dispatch(setCurrentColumnId(column.id));
      dispatch(setIsConfirmColumnModal(true));
    }
  };

  useEffect(() => {
    if (id) {
      updateColumn([id, { ...column, order: index }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  useEffect(() => {
    if (id) {
      updateColumn([id, column]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueTitle]);

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
      cursor: 'pointer',
      marginBottom: '1rem',
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
    input: {
      fontSize: 16,
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
          <div
            style={style.header}
            onClick={() => {
              dispatch(setIsColumnEdit(true));
              dispatch(setColumnEdited(column));
              setValueTitle(column.title);
            }}
          >
            {(!isColumnEdit || column.id !== columnEdited.id) && (
              <Typography variant="h5">{column.title}</Typography>
            )}
            {isColumnEdit && column.id === columnEdited.id && (
              <Input
                id="standard-basic"
                autoFocus={true}
                value={valueTitle}
                disableUnderline={true}
                sx={style.input}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValueTitle(event.target.value);
                }}
                onBlur={() => {
                  dispatch(setIsColumnEdit(false));
                  updateColumn([id as string, { ...columnEdited, title: valueTitle }]);
                }}
              />
            )}
          </div>
          {tasks &&
            tasks
              .map((task) => task)
              .sort((a, b) => (a.order > b.order ? 1 : -1))
              .map((task, index) => (
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
