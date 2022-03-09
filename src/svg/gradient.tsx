import React, { useCallback, useState } from 'react';

// 线性渐变
export const LinearGradient = () => {
  const [play, setPlay] = useState(false);

  const playVideo = useCallback(() => {
    setPlay((it) => !it);
  }, []);

  return (
    <svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="Gradient1">
          <stop className="stop1" offset="0%" />
          <stop className="stop2" offset="50%" />
          <stop className="stop3" offset="100%" />
        </linearGradient>
        <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="red" />
          <stop offset="50%" stop-color="black" stop-opacity="0.5" />
          <stop offset="100%" stop-color="blue" />
        </linearGradient>
        
      </defs>
      {/* <rect id="rect1" x="10" y="10" rx="15" ry="15" width="100" height="100"/> */}
      <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#Gradient2)"/>

      <path
        onClick={playVideo}
        style={{ transition: "ease all 0.3s" }}
        d={play ? "M 12,26 16.33,26 16.33,10 12,10 z M 20.66,26 25,26 25,10 20.66,10 z" : "M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"}
        fill="#000000"
      ></path>
    </svg>
  )
}