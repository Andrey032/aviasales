import styleInput from './input.module.scss';

const Input = ({ label, func, state }) => {
  const handleChangeInput = (event) => {
    func(event.target.check);
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
export { Input };
