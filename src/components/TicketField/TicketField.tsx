import { memo, useMemo } from 'react';
import Tabs from '../Tabs/index';
import Ticket from '../Ticket/index';
import styleTicketField from './TicketField.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import {
  allSelected,
  OneTicket,
  visibleTicketsSelector,
} from '../../features/tickets/ticketsSlice';
import { helperfilter } from '../../utils/helpers';

const TicketField: React.FC = () => {
  const ticketsAll = useAppSelector(allSelected);
  const visibleTickets = useAppSelector(visibleTicketsSelector);
  const allCheckBox = useAppSelector((state) => state.tickets.checkBox);

  const { all, noTransfers, oneTransfers, twoTransfers, threeTransfers } = allCheckBox;

  const isChekedConditionFalse = () => {
    return Object.values(allCheckBox).every((box) => box === false);
  };

  const filterTicketsByCheckboxes = useMemo(
    () =>
      (tickets: OneTicket[]): OneTicket[] => {
        if (all) return tickets;
        if (noTransfers) return helperfilter(tickets, 0);
        if (oneTransfers) return helperfilter(tickets, 1);
        if (twoTransfers) return helperfilter(tickets, 2);
        if (threeTransfers) return helperfilter(tickets, 3);
        return tickets;
      },
    [all, noTransfers, oneTransfers, twoTransfers, threeTransfers]
  );

  return (
    <div className={styleTicketField.ticketField}>
      <Tabs />
      {isChekedConditionFalse() && (
        <div className={styleTicketField.ticketField__ticketMessage}>
          "Рейсов, подходящих под заданные фильтры, не найдено"
        </div>
      )}
      {!isChekedConditionFalse() &&
        filterTicketsByCheckboxes(ticketsAll)
          .slice(0, visibleTickets)
          .map((ticket: OneTicket, index: number) => (
            <Ticket
              key={`${ticket.price}${index}`}
              {...ticket}
            />
          ))}
    </div>
  );
};
export default memo(TicketField);
