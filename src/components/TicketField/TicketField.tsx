import Tabs from '../Tabs/index';
import Ticket from '../Ticket/index';
import styleTicketField from './TicketField.module.scss';

const TicketField = () => {
  return (
    <div className={styleTicketField.ticketField}>
      <Tabs />
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
    </div>
  );
};
export { TicketField };
