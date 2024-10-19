import Tabs from '../Tabs/index';
import Ticket from '../Ticket/index';
import styleTicketField from './TicketField.module.scss';
import { useSelector } from 'react-redux';

let ticketId = 1;

const TicketField = () => {
  const tickets = useSelector((state) => state.tickets.items);

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
