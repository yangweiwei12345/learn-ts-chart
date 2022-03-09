import React, { useCallback, useEffect, useState } from 'react';
import { animated, useTransition, config, useSpringRef } from '@react-spring/web';
import './style.css';

const NUM_TRANS = [{fig: 1},{fig: 3}, {fig: 5}, {fig: 8}];
const op = n => n
const trans = 1;

function TransitionArray() {
  const [items, setItems] = useState(NUM_TRANS)

  const transitions = useTransition(items, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
    config: config.molasses,
    onRest: () => setItems([]),
  })

  useEffect(() => {
    if (items.length === 0) {
      setTimeout(() => {
        setItems(NUM_TRANS)
      }, 2000)
    }
  }, [items])

  return (
    <div style={{ display: 'flex' }}>
      {transitions(({ opacity }, item) => (
        <animated.div
          style={{
            opacity: opacity.to(op),
            transform: opacity
              .to(y => `translate3d(0,${y}px,0)`),
          }}>
          {item.fig}
        </animated.div>
      ))}
    </div>
  )
}
export default TransitionArray


const pages = [
  ({ style }) => <animated.div style={{ ...style, backgroundColor: 'lightpink' }}>A</animated.div>,
  ({ style }) => <animated.div style={{ ...style, backgroundColor: 'lightpink' }}>B</animated.div>,
  ({ style }) => <animated.div style={{ ...style, backgroundColor: 'lightpink' }}>C</animated.div>,
]

export function App() {
  const [index, set] = useState(0);
  const onClick = useCallback(() => set(state => (state + 1) % 3), []);
  const transRef = useSpringRef();
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: 'translate3d(0,100%,0) rotateX(45deg) scaleX(1)' },
    enter: { opacity: 1, transform: 'translate3d(0,0%,0) rotateX(0deg) scaleX(1)' },
    leave: { opacity: 0, transform: 'translate3d(0,-50%,0) rotateX(-45deg) scaleX(1)' },
  })

  useEffect(() => {
    transRef.start();
  }, [index])

  return (
    <div className='flex fill container' onClick={onClick}>
      {
        transitions((style, i) => {
          console.log(style, i);
          const Page = pages[i];

          return <Page style={style} />
        })
      }
    </div>
  )
}
