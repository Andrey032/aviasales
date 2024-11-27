import styleTicket from './Ticket.module.scss';
import DescriptionTicket from '../DescriptionTicket/index';
import { OneTicket } from '../../features/tickets/ticketsSlice';

const Ticket: React.FC<OneTicket> = ({ carrier, price, segments }) => {
  return (
    <article className={styleTicket.ticket}>
      <div className={styleTicket.ticket__header}>
        <h2 className={styleTicket.ticket__price}>{price} Р</h2>
        <img
          src={`//pics.avs.io/99/36/${carrier}.png`}
          alt={`логотип авиа компании${carrier}`}
        />
      </div>
      {segments.map((segment) => (
        <DescriptionTicket
          key={segment.destination}
          {...segment}
        />
      ))}
    </article>
  );
};
export default Ticket;
