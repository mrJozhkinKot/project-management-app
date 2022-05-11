import type { CSSProperties } from 'react';
import type { Identifier, XYCoord } from 'dnd-core';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { boardsSlice } from '../../reducers/BoardsSlice';
import { useAppDispatch } from '../../hooks/redux';
import ClearIcon from '@mui/icons-material/Clear';

const style = {
  task: {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    color: '#d0d6d4',
    cursor: 'pointer',
  },
};
export interface TaskProps {
  task: {
    id: string;
    title: string;
    order?: number;
    description?: string;
    userId?: string;
    files?: FileInterface[];
  };
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  column: Column;
}
interface Column {
  id: string;
  title: string;
  order: number;
  tasks: TaskDraftInterface[];
}
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

export interface FileInterface {
  filename: string;
  fileSize: number;
}
interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Task: React.FC<TaskProps> = ({ task, index, moveTask, column }) => {
  const { setColumn, deleteTask } = boardsSlice.actions;
  const dispatch = useAppDispatch();

  const onClickDeleteBtn = (id: string) => {
    dispatch(deleteTask(id));
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

      dispatch(setColumn(column));
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
    <div ref={ref} style={{ ...style.task, opacity }} data-handler-id={handlerId}>
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
