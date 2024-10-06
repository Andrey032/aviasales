import { useState } from 'react';
import './App.scss';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>hello</h1>
      <h1>{count}</h1>
      <h1>{count}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, recusandae nulla? Aperiam quos
        recusandae eligendi cumque, aliquam provident deleniti hic voluptatibus velit magnam, quasi nobis deserunt
        soluta minus laborum nulla.
      </p>
      <button onClick={() => setCount(count + 1)}>click</button>
    </div>
  );
}
export default App;
