import styleTicket from './Ticket.module.scss';
import DescriptionTicket from '../DescriptionTicket/index';

let descriptionTicketId = 1;

const Ticket = ({ ticket }) => {
  const { carrier, price, segments } = ticket;

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
          key={descriptionTicketId++}
          segment={segment}
        />
      ))}
    </article>
  );
};
export default Ticket;
