import Button from '../Button/index';
import styleTabs from './Tabs.module.scss';
import { cheap, fast, optimal } from '../../features/tab/tabsSlice';
import { useAppDispatch } from '../../hooks/hooks';

const Tabs = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styleTabs.tabs}>
      <Button
        text='САМЫЙ ДЕШЕВЫЙ'
        tab='tab1'
        handleClick={() => dispatch(cheap('САМЫЙ ДЕШЕВЫЙ'))}
      />
      <Button
        text='САМЫЙ БЫСТРЫЙ'
        tab='tab2'
        handleClick={() => dispatch(fast('САМЫЙ БЫСТРЫЙ'))}
      />
      <Button
        text='ОПТИМАЛЬНЫЙ'
        tab='tab3'
        handleClick={() => dispatch(optimal('ОПТИМАЛЬНЫЙ'))}
      />
    </div>
  );
};
export default Tabs;
