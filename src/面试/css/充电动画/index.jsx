import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const Batefacy = () => {

  return (
    <div>
      <div className="testp">
        <div className="test">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {/* <div className="g-number">98.7%</div> */}
      <div className="g-contrast">
        {/* <div className="g-circle"></div> */}
        <ul className="g-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
      </div>
    </div>
  )
}

ReactDOM.render(<Batefacy />, document.getElementById('app'))

