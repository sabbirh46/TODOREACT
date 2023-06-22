import cn from 'classnames';
import { FC, memo } from 'react';
import { FilterType } from '../../typedefs';
import { Todo } from '../TodoItem/Todo';

interface Props {
  activeTodos: Todo[],
  completedTodos: Todo[],
  filterType: FilterType,
  onChangeFilterType: (filterType: FilterType) => void,
  onRemoveCompleted: () => void,
}

export const Footer: FC<Props> = memo((props) => {
  const {
    filterType,
    activeTodos,
    completedTodos,
    onChangeFilterType,
    onRemoveCompleted,
  } = props;

  return (
    <footer>
    <div className=" bg-white flex justify-between items-center box-border h-[30px] px-[20px] py-[15px] text-sm text-center text-gray-500 border-t border-gray-300 shadow">
      <span className="todo-count">
        {`${activeTodos.length} items left`}
      </span>

      <nav className=" flex">
        {Object.values(FilterType).map(value => (
          <a
            href={`#/${value}`}
            key={value}
            className={cn(` m-[5px] px-[3px] py-[2px] text-gray-500 no-underline border border-transparent rounded selected:border-red-200 hover:border-red-200 focus:border-red-200  `, {
              selected: value === filterType,
            })}
            onClick={() => onChangeFilterType(value)}
          >
            {value}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={cn('hover:underline  active:no-underline', {
          'opacity-[0]': completedTodos.length === 0,
        })}
        onClick={onRemoveCompleted}
      >
        Clear completed
      </button>
      

    </div>
    <div className="mx-auto drop-shadow-xl  w-[590px] bg-neutral-100 border-b p-[2.5px]">

</div>
<div className="mx-auto drop-shadow-xl  w-[580px] bg-neutral-100 border-b p-[2.5px]">

</div>

    </footer>
  );
});