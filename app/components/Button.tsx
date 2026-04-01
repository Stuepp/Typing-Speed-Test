interface ButtonProps{
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export default function Button({label='click me', active=false, onClick} : ButtonProps){

  return(
    <button
      onClick={onClick}
      className={`
        text-nowrap
        border rounded-lg
        hover:cursor-pointer p-1 px-2
      active:border-blue-600 active:text-blue-600
        ${active ? 'border-blue-600 text-blue-600' : 'border-gray-400'}
      `}>
      {label}
    </button>
  );
}