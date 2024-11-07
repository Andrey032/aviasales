import Button from '../Button/index';
import styleTabs from './Tabs.module.scss';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { CHEAPEST, THE_FASTEST, OPTIMAL } from '../../utils/constants';
import { cheap, fast, optimal } from '../../features/tab/tabsSlice';

const Tabs: React.FC = () => {
  const [contentType, setContentType] = useState('');
  const dispatch = useAppDispatch();
  function handleClick(type: string) {
    setContentType(type);
  }

  return (
    <div className={styleTabs.tabs}>
      <Button
        text={CHEAPEST}
        tab='tab1'
        isActive={contentType === CHEAPEST}
        click={() => {
          dispatch(cheap(CHEAPEST));
          handleClick(CHEAPEST);
        }}
      />
      <Button
        text={THE_FASTEST}
        tab='tab2'
        isActive={contentType === THE_FASTEST}
        click={() => {
          dispatch(fast(THE_FASTEST));
          handleClick(THE_FASTEST);
        }}
      />
      <Button
        text={OPTIMAL}
        tab='tab3'
        isActive={contentType === OPTIMAL}
        click={() => {
          dispatch(optimal(OPTIMAL));
          handleClick(OPTIMAL);
        }}
      />
    </div>
  );
};
export default Tabs;
