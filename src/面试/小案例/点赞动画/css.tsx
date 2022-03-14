import React, { useEffect, useRef } from 'react';
import './css.scss';

const maxBubble = 7;
const CssLike = () => {
  const cacheRef = useRef({
    bubbleCnt: null,
    likeIcon: null,
    bubbleIndex: 0,
    timer: null,
  })

  useEffect(() => {
    cacheRef.current.bubbleCnt = document.getElementById('like-bubble-cnt');
    cacheRef.current.likeIcon = document.getElementById('like-icon');

    setInterval(() => {
      cacheRef.current.likeIcon.click();
    }, 500);
  }, [])

  const addBubble = () => {
    const { bubbleCnt } = cacheRef.current;

    cacheRef.current.bubbleIndex %= maxBubble;
    const d = document.createElement('div');

    // 图片b0 - b7
    // 随机动画 bl_1_1 bl_3_2
    const swing = Math.floor(Math.random() * 3) + 1;
    const speed = Math.floor(Math.random() * 2) + 1;
    d.className = `like-bubble b${cacheRef.current.bubbleIndex} bl_${swing}_${speed}`;

    bubbleCnt?.appendChild(d);
    cacheRef.current.bubbleIndex++;


    // 动画结束后销毁元素
    setTimeout(() => {
      bubbleCnt?.removeChild(d);
    }, 2600);
  }

  const onClick = () => {
    const { timer, likeIcon } = cacheRef.current;
    if(!likeIcon) return;

    if(timer) {
      clearTimeout(timer);
      cacheRef.current.timer = null;
    }

    likeIcon.classList.remove('bounce-click');

    setTimeout(() => {
      likeIcon.classList.add('bounce-click');
    }, 0);

    cacheRef.current.timer = setTimeout(() => {
      likeIcon.classList.remove('bounce-click');
      clearTimeout(timer!);
      cacheRef.current.timer = null;
    }, 300);
    addBubble();
  }

  return (
    <div id="like-bubble-cnt">
      <div id="like-icon" onClick={onClick}></div>
    </div>
  )
}

export default CssLike;