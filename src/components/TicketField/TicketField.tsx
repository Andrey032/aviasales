import Tabs from '../Tabs/index';
import Ticket from '../Ticket/index';
import styleTicketField from './TicketField.module.scss';
import { useAppSelector } from '../../hooks/hooks';

let ticketId = 1;

const TicketField = () => {
  const tickets = useAppSelector((state) => state.tickets.items);

  return (
    <div className={styleTicketField.ticketField}>
      <Tabs />
      {tickets.map((ticket) => (
        <Ticket
          key={ticketId++}
          ticket={ticket}
        />
      ))}
    </div>
  );
};
export default TicketField;
