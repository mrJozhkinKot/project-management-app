import ClearIcon from '@mui/icons-material/Clear';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { ColumnDraftInterface, TaskInterface } from '../../utils/interfaces';
import { Draggable } from 'react-beautiful-dnd';

const style = {
  task: {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    cursor: 'pointer',
    color: '#E36655',
  },
};
export interface TaskProps {
  task: TaskInterface;
  index: number;
  column: ColumnDraftInterface;
}

export const Task: React.FC<TaskProps> = ({ task, column, index }) => {
  const {
    setIsModalEditTask,
    setTask,
    setCurrentColumnId,
    setCurrentTaskId,
    setCurrentBoardId,
    setIsConfirmTaskModal,
  } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const onClickDeleteBtn = () => {
    if (id) {
      dispatch(setCurrentBoardId(id));
      dispatch(setCurrentColumnId(column.id));
      dispatch(setCurrentTaskId(task.id));
      dispatch(setIsConfirmTaskModal(true));
    }
  };

  const onClickEditTask = () => {
    dispatch(setCurrentColumnId(column.id));
    dispatch(setCurrentTaskId(task.id));
    dispatch(setCurrentBoardId(id as string));
    dispatch(setTask(task));
    dispatch(setIsModalEditTask(true));
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div style={style.task} onClick={onClickEditTask}>
            {task.title}
            <ClearIcon
              fontSize="small"
              style={style.icon}
              onClick={(e) => {
                e.stopPropagation();
                onClickDeleteBtn();
              }}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};
