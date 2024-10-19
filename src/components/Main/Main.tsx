import styleMain from './Main.module.scss';
import FilterTransfers from '../FilterTransfers/index';
import TicketSelectionField from '../TicketField/index';
import { useSelector } from 'react-redux';
import Spiner from '../Spiner/index';
import Button from '../Button';

const Main = () => {
  const isFetching = useSelector((state) => state.tickets.isFetching);

  return (
    <>
      {isFetching && <Spiner />}
      {!isFetching && (
        <section className={styleMain.main}>
          <FilterTransfers />
          <TicketSelectionField />
          <Button
            text={'ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!'}
            tab={'more'}
          />
        </section>
      )}
    </>
  );
};
export default Main;
