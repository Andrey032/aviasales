import styleLogo from './Logo.module.scss';
import logoSvg from '/assets/logo.svg';
const Logo = () => {
  return (
    <div className={styleLogo.logo__contaier}>
      <img
        className={styleLogo.logo}
        src={logoSvg}
        alt='логотип'
      />
    </div>
  );
};
export { Logo };