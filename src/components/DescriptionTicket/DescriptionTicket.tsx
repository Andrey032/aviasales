import styleDescription from './DescriptionTicket.module.scss';

const DescriptionTicket = ({ segment }) => {
  const { date, destination, duration, origin, stops } = segment;

  const fixLength = (time) => {
    if (time.length < 2) return `0${time}`;
    return time;
  };

  const getDepartureTime = (time) => {
    const date = new Date(time);
    const hours = String(date.getUTCHours());
    const minutes = String(date.getUTCMinutes());
    return fixLength(hours) + ':' + fixLength(minutes);
  };

  const convertDuration = (flightDuration) => {
    const hours = String(Math.floor(flightDuration / 60)).padStart(2, '0');
    const minutes = String(flightDuration % 60).padStart(2, '0');
    return `${hours}ч ${minutes}мин`;
  };

  const getArrivalTime = (departureTime, flightDuration) => {
    const [hours, minutes] = departureTime.split(':');
    const departureDate = new Date();
    departureDate.setHours(hours);
    departureDate.setMinutes(minutes);
    departureDate.setMinutes(departureDate.getMinutes() + flightDuration);
    const arrivalHours = String(departureDate.getHours()).padStart(2, '0');
    const arrivalMinutes = String(departureDate.getMinutes()).padStart(2, '0');
    return `${arrivalHours}:${arrivalMinutes}`;
  };

  return (
    <table className={styleDescription.description}>
      <thead>
        <tr className={styleDescription.description__subTitle}>
          <th className={styleDescription.description__info}>{`${origin} – ${destination}`}</th>
          <th className={styleDescription.description__info}>В ПУТИ</th>
          <th className={styleDescription.description__info}>{`${stops.length} ПЕРЕСАДКИ`}</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styleDescription.description__subTitle}>
          <td
            className={styleDescription.description__text}
          >{`${getDepartureTime(date)} – ${getArrivalTime(getDepartureTime(date), duration)}`}</td>
          <td className={styleDescription.description__text}>{convertDuration(duration)}</td>
          <td className={styleDescription.description__text}>
            {stops.map((item) => item).join(' ')}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default DescriptionTicket;
