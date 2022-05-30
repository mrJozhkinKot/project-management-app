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
import { ColumnInterface, TaskDraftInterface, TaskInterface } from '../../utils/interfaces';
import { Task } from './Task';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { handleBoardsErrors, notifySuccess } from '../toasts/toasts';
import { ParsedErrorInterface } from '../../utils/interfaces';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

interface ColumnProps {
  column: ColumnInterface;
  index: number;
}

const Column: React.FC<ColumnProps> = ({ column, index }) => {
  const [cookies] = useCookies(['token']);
  const {
    setIsModalTask,
    setCurrentColumnId,
    setCurrentBoardId,
    setIsColumnEdit,
    setColumnEdited,
    setIsConfirmColumnModal,
  } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { isColumnEdit, columnEdited, localColumns } = useAppSelector(
    (state) => state.boardsReducer
  );

  const [valueTitle, setValueTitle] = useState('');
  const { id } = useParams();
  const [updateColumn, {}] = boardsAPI.useUpdateColumnMutation();
  const [localTasks, setLocalTasks] = useState<TaskInterface[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setLocalTasks(
      column.tasks.map((task: TaskDraftInterface) => ({
        ...task,
        boardId: id as string,
        columnId: column.id,
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localColumns]);

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
    if (id && valueTitle) {
      updateColumn([
        cookies.token,
        id,
        { id: column.id, title: column.title, order: column.order },
      ]).catch((error) => {
        const parsedError: ParsedErrorInterface = JSON.parse(JSON.stringify(error));
        handleBoardsErrors(parsedError, 'columns');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueTitle]);

  const style = {
    container: {
      width: '260px',
      margin: '0.7rem',
      minHeight: '60px',
      maxHeight: 'calc(100vh - 20rem)',
      border: '1px solid gray',
      padding: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      backgroundColor: '#d3e3e3',
      '& ::-webkit-scrollbar': { width: '0.5rem' },
    },
    content: {
      height: '100%',
      overflowY: 'scroll' as const,
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
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Box {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
          <Droppable droppableId={column.id}>
            {(provided) => (
              <Box sx={style.container} {...provided.droppableProps} ref={provided.innerRef}>
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
                          updateColumn([
                            cookies.token,
                            id as string,
                            { id: columnEdited.id, order: columnEdited.order, title: valueTitle },
                          ]);
                        }}
                      />
                      <DoneIcon
                        sx={style.inputIcon}
                        onClick={(event: React.MouseEvent<SVGSVGElement>) => {
                          event.stopPropagation();
                          dispatch(setIsColumnEdit(false));
                          updateColumn([
                            cookies.token,
                            id as string,
                            { id: columnEdited.id, order: columnEdited.order, title: valueTitle },
                          ])
                            .unwrap()
                            .then((response) => {
                              if (response) {
                                notifySuccess(t('column_updated_successfully'));
                              }
                            })
                            .catch((error) => {
                              const parsedError: ParsedErrorInterface = JSON.parse(
                                JSON.stringify(error)
                              );
                              handleBoardsErrors(parsedError, 'columns');
                            });
                        }}
                      />
                    </div>
                  )}
                </div>
                <div style={style.content}>
                  {localTasks &&
                    localTasks
                      .map((task) => task)
                      .sort((a, b) => (a.order > b.order ? 1 : -1))
                      .map((task, index) => (
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
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      )}
    </Draggable>
  );
};

export default Column;
