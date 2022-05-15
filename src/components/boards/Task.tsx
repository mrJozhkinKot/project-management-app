import type { Identifier, XYCoord } from 'dnd-core';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useAppDispatch } from '../../hooks/redux';
import ClearIcon from '@mui/icons-material/Clear';
import { ColumnDraftInterface, TaskInterface } from '../../utils/interfaces';
import { tasksAPI } from '../../utils/tasksService';

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
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  column: ColumnDraftInterface;
}
interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Task: React.FC<TaskProps> = ({ task, index, moveTask, column }) => {
  const { setIsModalEditTask, setTask } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const [deleteTask, {}] = tasksAPI.useDeleteTaskMutation();

  const onClickDeleteBtn = (id: string) => {
    deleteTask([id, column.id, task.id]);
  };

  const onClickEditTask = () => {
    dispatch(setTask(task));
    dispatch(setIsModalEditTask(true));
  };

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.TASK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      //dispatch(setColumn(column));
      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: () => {
      const id = task.id;
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{ ...style.task, opacity }}
      data-handler-id={handlerId}
      onClick={onClickEditTask}
    >
      {task.title}
      <ClearIcon
        fontSize="small"
        style={style.icon}
        onClick={(e) => {
          e.stopPropagation();
          onClickDeleteBtn(task.id);
        }}
      />
    </div>
  );
};
