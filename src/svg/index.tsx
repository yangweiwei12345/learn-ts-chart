import React from 'react';
import ReactDOM from 'react-dom';
import { PathC, PathS, PathQ, PathA } from './path'
import { LinearGradient } from './gradient'

const SVG = () => {

  return (
    <>
      <h2>路径</h2>
      <PathC />
      <PathS />
      <PathQ />
      <PathA />

      <h2>渐变</h2>
      <LinearGradient />
    </>
  )
}

ReactDOM.render(<SVG />, document.getElementById('app'))
