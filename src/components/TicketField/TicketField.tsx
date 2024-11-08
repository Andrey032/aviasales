import { memo } from 'react';
import Tabs from '../Tabs/index';
import Ticket from '../Ticket/index';
import styleTicketField from './TicketField.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import { allSelected, visibleTicketsSelector } from '../../features/tickets/ticketsSlice';

const TicketField: React.FC = () => {
  const ticketsAll = useAppSelector(allSelected);
  const visibleTickets = useAppSelector(visibleTicketsSelector);
  const allCheckBox = useAppSelector((state) => state.checkBox);

  const isChekedConditionFalse = () => {
    return Object.values(allCheckBox).every((box) => box === false);
  };

  return (
    <div className={styleTicketField.ticketField}>
      <Tabs />
      {isChekedConditionFalse() && (
        <div className={styleTicketField.ticketField__ticketMessage}>
          "Рейсов, подходящих под заданные фильтры, не найдено"
        </div>
      )}
      {!isChekedConditionFalse() &&
        ticketsAll.slice(0, visibleTickets).map((ticket, index) => (
          <Ticket
            key={`${ticket.price}${index}`}
            {...ticket}
          />
        ))}
    </div>
  );
};
export default memo(TicketField);
