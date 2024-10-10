import styleInput from './input.module.scss';
const Input = ({ label }) => {
  return (
    <label className={styleInput.check}>
      <input
        type='checkbox'
        className={styleInput.check__input}
      />
      <span className={styleInput.check__box}></span>
      {label}
    </label>
  );
};
export { Input };
