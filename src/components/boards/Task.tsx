import { boardsSlice } from '../../reducers/BoardsSlice';
import { useAppDispatch } from '../../hooks/redux';
import ClearIcon from '@mui/icons-material/Clear';
import { ColumnDraftInterface, TaskInterface } from '../../utils/interfaces';
import { useParams } from 'react-router-dom';

const style = {
  task: {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: '#fff',
    cursor: 'move',
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

export const Task: React.FC<TaskProps> = ({ task, column }) => {
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
  );
};
