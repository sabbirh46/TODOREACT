import {
    FC,
    useContext,
    useState,
    FormEvent,
    ChangeEvent,
    KeyboardEvent,
    memo,
    useRef,
    useEffect,
  } from 'react';
  import cn from 'classnames';
  import { Todo } from './Todo';
  import { LoadContext } from '../../Context/LoadContext';
  
  interface Props {
    todo: Todo,
    onDelete: (id: number) => void,
    onChangeStatus: (id: number, property: Partial<Todo>) => void
  }
  
  export const TodoItem: FC<Props> = memo((props) => {
    const {
      todo,
      onDelete,
      onChangeStatus,
    } = props;
  
    const {
      id,
      title,
      completed,
    } = todo;
  
    const loadingTodos = useContext(LoadContext);
    const [isEditing, setIsEditing] = useState(false);
    const [changedTitle, setChangedTitle] = useState(title);
    const input = useRef<HTMLInputElement | null>(null);
  
    const updateTodoTitle = () => {
      if (changedTitle === title) {
        setIsEditing(false);
  
        return;
      }
  
      if (!changedTitle.trim()) {
        onDelete(id);
      }
  
      onChangeStatus(id, { title: changedTitle });
      setIsEditing(false);
    };
  
    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
      setChangedTitle(event.target.value);
    };
  
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      updateTodoTitle();
    };
  
    const cancelEditing = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
        setChangedTitle(title);
      }
    };
  
    useEffect(() => {
      if (isEditing && input.current) {
        input.current.focus();
      }
    }, [isEditing]);
  
    return (
      <div className={cn('group relative grid grid-cols-3  font-[24px] leading-[1.4em] border-b border-gray-300 last:border-b-0   ', { completed })}>
        <label  className="  cursor-pointer  bg-no-repeat bg-center-left">
          <input
          
            type="checkbox"
            className={`  opacity-100 form-checkbox h-[30px] w-[30px] ml-[20px] mt-[11px]  border border-gray-500 rounded-full appearance-none ${completed ? 'bg-green-500' : ' '}  `}
            onChange={() => {
              onChangeStatus(id, { completed: !completed });
            }}
          />
         
        </label>
  
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              ref={input}
              type="text"
              className="w-full py-[11px] px-[14px] text-base leading-normal bg-white border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:border-[ #999]"
              placeholder="Empty todo will be deleted"
              value={changedTitle}
              onChange={handleChangeTitle}
              onBlur={updateTodoTitle}
              onKeyUp={cancelEditing}
            />
           
          </form>
        ) : (
          <>
            <span
              className={`py-[12px] px-[15px] break-all transition-colors duration-400 ${completed ? 'text-gray-400 line-through' : 'text-gray-800'} `}
              onDoubleClick={() => setIsEditing(true)}
            >
              {title}
            </span>
  
            <button
              type="button"
              className=" items-center mt-[15px] right-12 font-[500]  text-[30px] leading-tight text-red-400 float-right border-0 bg-transparent cursor-pointer transform -translate-y-2 opacity-0 transition-colors duration-200 ease-out group-hover:text-red-600  group-hover:opacity-50"
              onClick={() => onDelete(id)}
            >
              ×
            </button>
          </>
        )}
  
        <div className={cn('modal overlay', {
          'is-active': loadingTodos.includes(id),
        })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    );
  });