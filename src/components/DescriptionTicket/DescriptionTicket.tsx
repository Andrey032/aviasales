import styleDescription from './DescriptionTicket.module.scss';

const DescriptionTicket = () => {
  return (
    <table className={styleDescription.description}>
      <thead>
        <tr className={styleDescription.description__subTitle}>
          <th className={styleDescription.description__info}>MOW – HKT</th>
          <th className={styleDescription.description__info}>В ПУТИ</th>
          <th className={styleDescription.description__info}>2 ПЕРЕСАДКИ</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styleDescription.description__subTitle}>
          <td className={styleDescription.description__text}>10:45 – 08:00</td>
          <td className={styleDescription.description__text}>21ч 15м</td>
          <td className={styleDescription.description__text}>HKG, JNB</td>
        </tr>
      </tbody>
    </table>
  );
};
export default DescriptionTicket;
