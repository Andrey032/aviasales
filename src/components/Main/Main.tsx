import styleMain from './Main.module.scss';
import FilterTransfers from '../FilterTransfers/index';
import TicketSelectionField from '../TicketField/index';
import { useAppSelector } from '../../hooks/hooks';
import Spiner from '../Spiner/index';
import Button from '../Button';

const Main = () => {
  const isFetching = useAppSelector((state) => state.tickets.isFetching);

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
