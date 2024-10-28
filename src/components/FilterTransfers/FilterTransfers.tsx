import Input from '../Input/index';
import styleFilter from './FilterTransfers.module.scss';
import {
  allAction,
  noTransfersAction,
  oneTransfersAction,
  twoTransfersAction,
  threeTransfersAction,
  selectCheckBox,
} from '../../features/checkBox/checkBoxsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const FilterTransfers: React.FC = () => {
  const dispatch = useAppDispatch();
  const checkBoxState = useAppSelector(selectCheckBox);

  const { all, noTransfers, oneTransfers, twoTransfers, threeTransfers } = checkBoxState;

  const isAllChecked = () => !checkBoxState.all;

  return (
    <div className={styleFilter.filter}>
      <h1 className={styleFilter.filter__title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h1>
      <div className={styleFilter.filter__wrapper}>
        <Input
          label='Все'
          func={() => dispatch(allAction(isAllChecked()))}
          state={all}
        />
        <Input
          label='Без пересадок'
          func={() => dispatch(noTransfersAction())}
          state={noTransfers}
        />
        <Input
          label='1 пересадка'
          func={() => dispatch(oneTransfersAction())}
          state={oneTransfers}
        />
        <Input
          label='2 пересадки'
          func={() => dispatch(twoTransfersAction())}
          state={twoTransfers}
        />
        <Input
          label='3 пересадки'
          func={() => dispatch(threeTransfersAction())}
          state={threeTransfers}
        />
      </div>
    </div>
  );
};
export default FilterTransfers;
