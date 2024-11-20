import styleMain from './Main.module.scss';
import FilterTransfers from '../FilterTransfers/index';
import TicketSelectionField from '../TicketField/index';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import {
  addSlice,
  isErrorSelect,
  selectCheckBox,
  stopStatusSelect,
} from '../../features/tickets/ticketsSlice';
import Spiner from '../Spiner/index';
import Button from '../Button';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const isStop = useAppSelector(stopStatusSelect);
  const isChecked = useAppSelector(selectCheckBox);
  const isError = useAppSelector(isErrorSelect);

  const isCheckCheckedBox = () => {
    return Object.keys(isChecked).some((el) => isChecked[el]);
  };

  return (
    <>
      {!isStop && <Spiner />}
      <section className={styleMain.main}>
        <FilterTransfers />
        <TicketSelectionField />
        {isCheckCheckedBox() && !isError && (
          <Button
            text={'ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!'}
            tab={'more'}
            click={() => dispatch(addSlice())}
          />
        )}
      </section>
    </>
  );
};
export default Main;
