import { memo, useMemo } from 'react';
import Tabs from '../Tabs/index';
import Ticket from '../Ticket/index';
import styleTicketField from './TicketField.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import {
  allSelected,
  OneTicket,
  selectCheckBox,
  visibleTicketsSelector,
} from '../../features/tickets/ticketsSlice';
import { helperFilter } from '../../utils/helpers';

const TicketField: React.FC = () => {
  const ticketsAll = useAppSelector(allSelected);
  const visibleTickets = useAppSelector(visibleTicketsSelector);
  const allCheckBox = useAppSelector(selectCheckBox);
  let id = 0;
  const { all, noTransfers, oneTransfers, twoTransfers, threeTransfers } = allCheckBox;

  const isChekedConditionFalse = () => {
    return Object.values(allCheckBox).every((box) => box === false);
  };

  const filterTicketsByCheckboxes = useMemo(
    () =>
      (tickets: OneTicket[]): OneTicket[] =>
        tickets.filter((ticket) => {
          if (all) return ticket;
          if (noTransfers && helperFilter(ticket, 0)) return true;
          if (oneTransfers && helperFilter(ticket, 1)) return true;
          if (twoTransfers && helperFilter(ticket, 2)) return true;
          if (threeTransfers && helperFilter(ticket, 3)) return true;
          return false;
        }),
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
          .map((ticket: OneTicket) => (
            <Ticket
              key={`${ticket.price}${++id}`}
              {...ticket}
            />
          ))}
    </div>
  );
};
export default memo(TicketField);
