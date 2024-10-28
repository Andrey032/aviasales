import styleInput from './input.module.scss';

interface InputProps {
  label: string;
  func: (str: boolean) => void;
  state: boolean;
}

const Input: React.FC<InputProps> = ({ label, func, state }) => {
  const handleChangeInput = (event: { target: { checked: boolean } }) => {
    func(event.target.checked);
  };

  return (
    <label className={styleInput.check}>
      <input
        type='checkbox'
        className={styleInput.check__input}
        onChange={handleChangeInput}
        checked={state}
      />
      <span className={styleInput.check__box}></span>
      {label}
    </label>
  );
};
export default Input;
