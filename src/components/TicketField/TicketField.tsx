import { memo } from 'react';
import { OneTicket } from '../../features/tickets/ticketsSlice';
import Tabs from '../Tabs/index';
import Ticket from '../Ticket/index';
import styleTicketField from './TicketField.module.scss';
import { useAppSelector } from '../../hooks/hooks';
import {
  allSelected,
  noTransfersSelected,
  oneTransfersSelected,
  twoTransfersSelected,
  threeTransfersSelected,
  visibleTicketsSelector,
} from '../../features/tickets/ticketsSlice';

let ticketId = 1;

const TicketField: React.FC = () => {
  const tab = useAppSelector((state) => state.tab);
  const ticketsAll = useAppSelector(allSelected);
  const ticketsNoTransfers = useAppSelector(noTransfersSelected);
  const ticketsOneTransfers = useAppSelector(oneTransfersSelected);
  const ticketsTwoTransfers = useAppSelector(twoTransfersSelected);
  const ticketsThreeTransfers = useAppSelector(threeTransfersSelected);
  const visibleTickets = useAppSelector(visibleTicketsSelector);

  const { all, noTransfers, oneTransfers, twoTransfers, threeTransfers } = useAppSelector(
    (state) => state.checkBox
  );

  const ticketGroups = [
    { condition: all, tickets: ticketsAll },
    { condition: noTransfers, tickets: ticketsNoTransfers },
    { condition: oneTransfers, tickets: ticketsOneTransfers },
    { condition: twoTransfers, tickets: ticketsTwoTransfers },
    { condition: threeTransfers, tickets: ticketsThreeTransfers },
  ];

  const getFirstFiveTickets = (tickets: OneTicket[]) => {
    return tickets.slice(0, visibleTickets).map((ticket) => (
      <Ticket
        key={ticketId++}
        {...ticket}
      />
    ));
  };

  const sortByPrice = (a: JSX.Element, b: JSX.Element) => a.props.price - b.props.price;

  const sortByDuration = (a: JSX.Element, b: JSX.Element) =>
    a.props.segments[0].duration +
    a.props.segments[1].duration -
    (b.props.segments[0].duration + b.props.segments[1].duration);

  const sortedTickets = (tickets: OneTicket[], tab: string) => {
    const slicedTickets = getFirstFiveTickets(tickets);
    switch (tab) {
      case 'САМЫЙ ДЕШЕВЫЙ':
        return slicedTickets.sort(sortByPrice);
      case 'САМЫЙ БЫСТРЫЙ':
        return slicedTickets.sort(sortByDuration);
      default:
        return slicedTickets;
    }
  };

  return (
    <div className={styleTicketField.ticketField}>
      <Tabs />
      {ticketGroups.map((group) => group.condition && sortedTickets(group.tickets, tab))}
    </div>
  );
};
export default memo(TicketField);
