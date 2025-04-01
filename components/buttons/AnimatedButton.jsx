import clsx from 'clsx';
import { Button } from '../ui/button';

const AnimatedButton = ({ id, title, rightIcon, leftIcon, containerClass }) => {
  return (
    <Button
      id={id}
      className={clsx(
        'group relative z-10 w-fit cursor-pointer overflow-hidden rounded-lg px-5',
        containerClass
      )}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-semibold text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      {rightIcon}
    </Button>
  );
};

export const CounterButton = ({ label, count, isActive, onClick }) => {
  return (
    <div className="relative flex flex-col items-center">
      <Button
        className={`text-sm rounded-none min-w-[200px] flex items-center justify-center ${
          isActive ? "border-b-2 border-primary text-primary" : "text-gray-500 "
        }`}
        variant="ghost"
        onClick={onClick}
      >
        {label}
      </Button>
      {count !== null && (
        <span className="absolute top-[-5px] right-[-5px] bg-blue-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center z-30">
          {count}
        </span>
      )}
    </div>
  );
};

export default AnimatedButton;
