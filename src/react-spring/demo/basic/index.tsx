import React, { useState } from 'react';
import { useSpring, animated, to } from '@react-spring/web';

const App = () => {
  const [flip, set] = useState(false);
  const props = useSpring({
    to: { background: 'red' },
    from: { background: 'blue' },
    reset: true,
    reverse: flip,
    delay: 2000,
    onRest: () => { console.log(flip); set(!flip) }
  })

  return <animated.div style={props}>淡入</animated.div>
}

const Num = () => {
  const [flip, set] = useState(false);
  const { number } = useSpring({
    to: { number: 1},
    from: { number: 0 },
    reset: true,
    reverse: flip,
    delay: 2000,
    onRest: () => { set(!flip) }
  })

  return <animated.div>{number.to(n => n.toFixed(2))}</animated.div>
}


const All = () => {
  const { o, xyz, color } = useSpring({
    from: { o: 0, xyz: [0,0,0], color: 'red' },
    o: 1,
    xyz: [10, 20, 5],
    color: 'green'
  })

  return (
    <animated.div
      style={{
        color,
        background: o.to(o => `rgba(210, 57, 77, ${o})`),
        transform: xyz.to((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`),
        border: to([o, color], (o, c) => `${o * 10}px solid ${c}`),
        padding: o
          .to({ range: [0, 0.5, 1], output: [0,0, 10] })
          .to(o => `${o}%`),
        borderColor: o.to({ range: [0, 1], output: ['red', '#ffaabb'] }),
        opacity: o.to([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1]),
      }}
    >
      {o.to(n => n.toFixed(2))}
    </animated.div>
  )
}

// 循环
const LoopTrue = () => {
  const styles = useSpring({
    loop: { reverse: true }, // or () => true
    config: { duration: 50 },
    from: { x: 0 },
    to: { x: 60 },
    delay: 200,
  })

  return (
    <animated.div
      style={{
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#46e891',
        ...styles
      }}
    >
    </animated.div>
  )
}

export default LoopTrue