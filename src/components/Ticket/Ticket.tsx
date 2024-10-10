import s7Logo from '/assets/S7_logo.svg';
import styleTicket from './Ticket.module.scss';
import DescriptionTicket from '../DescriptionTicket/index';

const Ticket = () => {
  return (
    <article className={styleTicket.ticket}>
      <div className={styleTicket.ticket__header}>
        <h2 className={styleTicket.ticket__price}>13 400 Р</h2>
        <img
          src={s7Logo}
          alt='логотип авиа компании'
        />
      </div>
      <DescriptionTicket />
      <DescriptionTicket />
    </article>
  );
};
export { Ticket };
