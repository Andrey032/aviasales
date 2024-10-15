import styleApp from './App.module.scss';
import Logo from '../Logo/index';
import Main from '../Main/index';

function App() {
  return (
    <div className={styleApp.app}>
      <Logo />
      <Main />
    </div>
  );
}
export default App;
