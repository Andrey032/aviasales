import styleMain from './Main.module.scss';
import FilterTransfers from '../FilterTransfers/index';
import TicketSelectionField from '../TicketField/index';
import Button from '../Button';

const Main = () => {
  return (
    <section className={styleMain.main}>
      <FilterTransfers />
      <TicketSelectionField />
      <Button
        text={'ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!'}
        tab={'more'}
      />
    </section>
  );
};
export { Main };
