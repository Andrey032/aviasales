import styleButton from './Button.module.scss';
import classnames from 'classnames';

interface ButtonProps {
  text: string;
  tab: string;
  isActive?: boolean;
  click: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, tab, isActive, click }) => {
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

  return (
    <button
      className={isActive ? `${borderButton} ${styleButton.button__active}` : borderButton}
      onClick={click}
    >
      {text}
    </button>
  );
};
export default Button;
