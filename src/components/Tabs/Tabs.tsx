import Button from '../Button/index';
import styleTabs from './Tabs.module.scss';
const Tabs = () => {
  return (
    <div className={styleTabs.tabs}>
      <Button
        text={'САМЫЙ ДЕШЕВЫЙ'}
        tab={'tab1'}
      />
      <Button
        text={'САМЫЙ БЫСТРЫЙ'}
        tab={'tab2'}
      />
      <Button
        text={'ОПТИМАЛЬНЫЙ'}
        tab={'tab3'}
      />
    </div>
  );
};
export { Tabs };
