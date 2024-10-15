import Button from '../Button/index';
import styleTabs from './Tabs.module.scss';
import { cheap, fast, optimal } from '../../redux/actions/actionsTab';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

const Tabs = () => {
  const dispatch = useDispatch();

  const { cheapDespatch, fastDespatch, optimalDespatch } = bindActionCreators(
    {
      cheapDespatch: cheap,
      fastDespatch: fast,
      optimalDespatch: optimal,
    },
    dispatch
  );

  return (
    <div className={styleTabs.tabs}>
      <Button
        text='САМЫЙ ДЕШЕВЫЙ'
        tab='tab1'
        handleClick={cheapDespatch}
      />
      <Button
        text='САМЫЙ БЫСТРЫЙ'
        tab='tab2'
        handleClick={fastDespatch}
      />
      <Button
        text='ОПТИМАЛЬНЫЙ'
        tab='tab3'
        handleClick={optimalDespatch}
      />
    </div>
  );
};
export default Tabs;
