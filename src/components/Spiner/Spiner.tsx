import styleSpiner from './Spiner.module.scss';

const Spiner: React.FC = () => {
  return <span className={styleSpiner.loader}></span>;
};
export default Spiner;
