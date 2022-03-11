import React from 'react';
import ReactDOM from 'react-dom';
import {
  BasicBar
} from './src/demos';

const App: React.FC<any> = () => {

    return (
      <div>
        <BasicBar />
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));