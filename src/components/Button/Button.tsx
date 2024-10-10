import styleButton from './Button.module.scss';
import classnames from 'classnames';

const Button = ({ text = '', tab = '' }) => {
  const {
    button,
    button__leftRadius: leftRadius,
    button__rightRadius: rightRadius,
    button__buttonMore: buttonMore,
  } = styleButton;

  const borderButton = classnames(
    button,
    tab === 'tab1' && leftRadius,
    tab === 'tab3' && rightRadius,
    tab === 'more' && buttonMore
  );
  return <button className={borderButton}>{text}</button>;
};
export { Button };
