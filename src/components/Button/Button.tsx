import styleButton from './Button.module.scss';

const Button = ({ text = '', tab = '' }) => {
  let border;

  if (tab === 'tab1') {
    border = {
      borderTopLeftRadius: '5px',
      borderBottomLeftRadius: '5px',
    };
  } else if (tab === 'tab3') {
    border = {
      borderTopRightRadius: '5px',
      borderBottomRightRadius: '5px',
    };
  } else if (tab === 'more') {
    border = {
      borderRadius: '5px',
      backgroundColor: '#2196f3',
      color: '#ffffff',
    };
  }

  return (
    <button
      style={border}
      className={styleButton.button}
    >
      {text}
    </button>
  );
};
export { Button };
