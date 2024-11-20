import styleError from './Error.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import { errorMessageSelect } from '../../features/tickets/ticketsSlice';

const Error = () => {
  const selectError = useAppSelector(errorMessageSelect);

  return <h2 className={styleError.error}>{selectError}</h2>;
};

export default Error;
