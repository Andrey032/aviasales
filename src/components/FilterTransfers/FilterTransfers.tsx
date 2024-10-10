import Input from '../Input/index';
import styleFilter from './FilterTransfers.module.scss';
const FilterTransfers = () => {
  return (
    <div className={styleFilter.filter}>
      <h1 className={styleFilter.filter__title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h1>
      <div className={styleFilter.filter__wrapper}>
        <Input label='Все' />
        <Input label='Без пересадок' />
        <Input label='1 пересадка' />
        <Input label='2 пересадки' />
        <Input label='3 пересадки' />
      </div>
    </div>
  );
};
export { FilterTransfers };
