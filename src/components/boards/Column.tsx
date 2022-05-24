import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { boardsAPI } from '../../utils/boardService';
import { ColumnDraftInterface } from '../../utils/interfaces';
import { Task } from './Task';

interface ColumnProps {
  column: ColumnDraftInterface;
  index: number;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
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

  const [valueTitle, setValueTitle] = useState('');
  const { id } = useParams();
  const { data: tasks } = boardsAPI.useGetTasksQuery([id as string, column.id]);
  const [updateColumn, {}] = boardsAPI.useUpdateColummnMutation();

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
      updateColumn([id, column]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueTitle]);

  const style = {
    container: {
      maxWidth: '300px',
      maxHeight: 'calc(100vh - 28rem)',
      border: '1px solid gray',
      padding: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: '#d3e3e3',
      cursor: 'move',
      '& ::-webkit-scrollbar': { width: '0.5rem' },
    },
    content: {
      height: '100%',
      'overflow-y': 'scroll',
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
    inputContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    input: {
      fontSize: 16,
    },
    inputIcon: {
      color: '#1C9D86',
    },
  };

  return (
    <Box sx={style.container}>
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
          <div style={style.inputContainer}>
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
            <DoneIcon
              sx={style.inputIcon}
              onClick={(event: React.MouseEvent<SVGSVGElement>) => {
                event.stopPropagation();
                dispatch(setIsColumnEdit(false));
                updateColumn([id as string, { ...columnEdited, title: valueTitle }]);
              }}
            />
          </div>
        )}
      </div>
      <div style={style.content}>
        {tasks &&
          tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} column={column} />
          ))}
      </div>
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
  );
};

export default Column;
