import React, { useMemo } from 'react';

const Circle = (props) => {
  let config = {
    r: 2,
    fill: 'red',
    ...props
  }

  return (
    <circle {...config} />
  )
}

const Line = (props) => {
  console.log(props);
  let config = useMemo(() => ({
    stroke: "red",
    ...props
  }), [props])

  return (
    <line {...config} />
  )
}

// 三次贝塞尔曲线 C
export const PathC = () => {

  return (
    <svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent" />
      {/* Points */}
      <Circle cx="10" cy="10" r="2" fill="red" />
      <Circle cx="20" cy="20" r="2" fill="red" />
      <line x1="10" y1="10" x2="20" y2="20" stroke="red" />
      <Circle cx="40" cy="20" r="2" fill="red" />
      <Circle cx="50" cy="10" r="2" fill="red" />
      <line x1="40" y1="20" x2="50" y2="10" stroke="red" />

      <path d="M 70 10 C 70 20, 120 20, 120 10" stroke="black" fill="transparent" />
      {/* Points */}
      <Circle cx="70" cy="10" r="2" fill="red" />
      <Circle cx="70" cy="20" r="2" fill="red" />
      <line x1="70" y1="10" x2="70" y2="20" stroke="red" />
      <Circle cx="120" cy="20" r="2" fill="red" />
      <Circle cx="120" cy="10" r="2" fill="red" />
      <line x1="120" y1="20" x2="120" y2="10" stroke="red" />

      <path d="M 130 10 C 120 20, 180 20, 170, 10" stroke="black" fill="transparent" />
      {/* Points */}
      <Circle cx="130" cy="10" r="2" fill="red" />
      <Circle cx="120" cy="20" r="2" fill="red" />
      <line x1="130" y1="10" x2="120" y2="20" stroke="red" />
      <Circle cx="180" cy="20" r="2" fill="red" />
      <Circle cx="170" cy="10" r="2" fill="red" />
      <line x1="180" y1="20" x2="170" y2="10" stroke="red" />

    </svg>
  )
}

/*
 * S命令用来创建与前面一样的贝塞尔曲线，
 * 如果S命令跟在一个C或S命令后面，则它的第一个控制点会被假设成前一个命令曲线的第二个控制点的中心对称点。
 * 如果S命令单独使用，前面没有C或S命令，那当前点将作为第一个控制点
 */
export const PathS = () => {

  return (
    <svg width="400px" height="200px" version="1.1" xmlns="http://www.w3.org/2000/svg">
      {/*  */}
      <path d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80 S 180 180, 210 110" stroke="black" fill="transparent" />
      <Circle cx="10" cy="80" />
      <Circle cx="40" cy="10" />
      <Line x1="10" y1="80" x2="40" y2="10" />
      <Circle cx="65" cy="10" />
      <Circle cx="95" cy="80" />
      <Line x1="65" y1="10" x2="95" y2="80" />
      <Circle cx="150" cy="150" />
      <Circle cx="180" cy="80" />
      <Line x1="150" y1="150" x2="180" y2="80" />
      <Circle cx="180" cy="180" />
      <Circle cx="210" cy="110" />
      <Line x1="180" y1="180" x2="210" y2="110" />
      
    </svg>
  )
}

// 二次贝塞尔曲线
export const PathQ = () => {


  return (
    <svg width="400px" height="200px" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 80 Q 95 10, 180 80" stroke="black" fill="transparent" />
    </svg>
  )
}

// 画弧
export const PathA = () => {

  return (
    <svg width="325px" height="325px" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M 80 80
               A 45 45 0 0 0 125 125
               L 125 80 Z" fill="green" />
      <Circle cx="80" cy="80" />
      <Circle cx="125" cy="125" />
      <Circle cx="102.5" cy="102.5" r="45" stroke="#ddd" fill="transparent" />
    </svg>
  )
}
