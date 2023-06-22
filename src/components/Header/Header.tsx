import cn from 'classnames';
import {
  ChangeEvent,
  FC,
  FormEvent,
  memo,
  useState,
} from 'react';

interface Props {
  onAdd: (title: string) => void,
  disabled: boolean,
  activeTodos: number,
  onUpdateAllStatus: () => void
}

export const Header: FC<Props> = memo((props) => {
  const {
    onAdd,
    disabled,
    activeTodos,
    onUpdateAllStatus,
  } = props;

  const [title, setTitle] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onAdd(title);
    setTitle('');
  };

  return (
    <header className="relative bg-white ">
      <button
        type="button"
        className={cn('absolute h-full w-[45px] mt-[6px]  flex justify-center items-center text-[24px] text-gray-300 active:text-gray-500 border-0 bg-transparent cursor-pointer transform -translate-y-2 rotate-90 leading-none', {
          active: !activeTodos,
        })}
        aria-label="all"
        onClick={onUpdateAllStatus}
       
      >
         ❯
        </button>
        

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full px-[16px] py-[16px] pl-[60px] text-[24px] leading-5 font-inherit antialiased bg-opacity-1 border-none bg-black bg-opacity-[.003] shadow-inset-0 -mb-2px  placeholder-text-gray-300 placeholder-opacity-100 italic  "
          placeholder="What needs to be done?"
          value={title}
          onChange={handleChange}
          disabled={disabled}
        />
      </form>
    </header>
  );
});