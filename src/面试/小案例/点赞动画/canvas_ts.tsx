import React, { useEffect, useRef } from 'react';

const CanvasLike = () => {
  const cacheRef = useRef({
    likeAni: null
  });

  useEffect(() => {
    let cv = new CanvasDraw('canvas', 1.5);
    cacheRef.current.likeAni = cv;
    setInterval(() => {
      cv.start();
    }, 50)
  }, [])

  const onClick = () => {
    cacheRef.current?.likeAni?.start?.();
  }

  return (
    <div style={{ position: 'relative', width: 100, height: 200 }}>
      <canvas id="canvas" width="200" height="400" style={{ width:100, height:200, background: '#eee' }}></canvas>
      <div onClick={onClick} style={{ width: 10, height: 10, borderRadius: 2, position: 'absolute', bottom: 0, right: 45, background: '#ddd' }}></div>
    </div>
  )

}


/** 图片显示宽高 */
const IMAGE_WIDTH = 60;

/** 图片原始宽高 */
const SOURCE_IMAGE_WIDTH = 144;

/** 图片数量 */
const IMG_NUM = 8;

/** 放大阶段（百分比）*/
const ENLARGE_STAGE = 0.1;

/** 收缩渐隐阶段（百分比）*/
const FADE_OUT_STAGE = 0.8;

// 获取指定范围的随机数
const random = (start: number, end: number): number => {
  return Math.floor(Math.random() * (end - start)) + start;
}

interface IRenderItem {
  render: (progress: number) => boolean;
  duration: number;
  timestamp: number;
}

class CanvasDraw {
  context: CanvasRenderingContext2D;
  width: number = 0;
  height: number = 0;
  canvasScale: number = 1;
  basicX: number;
  frequency: number;
  amplitude: number;
  img: string | null;
  curImgIndex: number;

  renderList: IRenderItem[];
  imgList: any[] = [];
  scanning: boolean;

  constructor(canvasId: string, canvasScale: number) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.canvasScale = canvasScale;
    this.basicX = this.width / 2;
    this.imgList = [];
    this.curImgIndex = 1;
    this.renderList = [];

    this.loadImages();
  }

  loadImages() {
    const images = [
      'jfs/t1/93992/8/9049/4680/5e0aea04Ec9dd2be8/608efd890fd61486.png',
      'jfs/t1/108305/14/2849/4908/5e0aea04Efb54912c/bfa59f27e654e29c.png',
      'jfs/t1/98805/29/8975/5106/5e0aea05Ed970e2b4/98803f8ad07147b9.png',
      'jfs/t1/94291/26/9105/4344/5e0aea05Ed64b9187/5165fdf5621d5bbf.png',
      'jfs/t1/102753/34/8504/5522/5e0aea05E0b9ef0b4/74a73178e31bd021.png',
      'jfs/t1/102954/26/9241/5069/5e0aea05E7dde8bda/720fcec8bc5be9d4.png'
    ];
    const promiseAll = [];
    images.forEach((src) => {
      const p = new Promise(function (resolve) {
        const img = new Image;
        img.onerror = img.onload = resolve.bind(null, img);
        img.src = 'https://img12.360buyimg.com/img/' + src;
      });
      promiseAll.push(p);
    });
    Promise.all(promiseAll).then((imgsList) => {
      this.imgList = imgsList.filter((d) => {
        if (d && d.width > 0) return true;
        return false;
      });
      if (this.imgList.length == 0) {
        return;
      }
    })
  }

  createRender(duration, timestamp) {
    if (this.imgList.length === 0) return null;

    // 正弦频率
    const frequency = random(2, 10);
    // 正弦振幅
    const amplitude = random(10, 20) * (random(0, 1) ? 1 : -1) * this.canvasScale;
    let image = this.imgList[random(0, this.imgList.length)]

    //获取横向位移
    const getTranslateX = (progress: number) => {
      if(progress < ENLARGE_STAGE) {
        // 放大期间不进行摇摆位移
        return this.basicX;
      }

      return this.basicX + amplitude * Math.sin(frequency * (progress - ENLARGE_STAGE));
    }

    // 获取竖向位移
    const getTranslateY = (progress: number) => {
      return IMAGE_WIDTH / 2 + (this.height - IMAGE_WIDTH / 2) * (1 - progress)
    }

    const getTranslateY1 = (progress: number) => {
      // 快速弹出
      if(progress <= ENLARGE_STAGE) {
        let c = (this.height - IMAGE_WIDTH / 2) * ( - ENLARGE_STAGE);  // 计算需要弹出的总距离, 变化量
        let d = duration * ENLARGE_STAGE;   // 持续时间
        let t = Date.now() - timestamp; // 当前时间
        let b = IMAGE_WIDTH / 2 + (this.height - IMAGE_WIDTH / 2);

        let s = -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;   // 动画公式

        return s > 0 ? s : 0
      }
      return IMAGE_WIDTH / 2 + (this.height - IMAGE_WIDTH / 2) * (1 - progress)
    }

    // 获取缩放比例
    const getScale = (progress: number) => {
      let r = 1;
      if(progress < ENLARGE_STAGE) {
        // 放大
        r = progress / ENLARGE_STAGE;
      } else if(progress > FADE_OUT_STAGE) {
        r = (1 - progress) / (1 - FADE_OUT_STAGE);
      }

      return r;
    }

    // 获取透明度
    const getAlpha = (progress: number) => {
      if(progress > FADE_OUT_STAGE) {
        return 1;
      }
      return 1 - (progress - FADE_OUT_STAGE) / (1 - FADE_OUT_STAGE)
    }


    return (progress: number) => {
      if(progress >= 1) return true;
  
      // let { curImgIndex } = this;
      // this.curImgIndex = ++curImgIndex % IMAGE_WIDTH;
  
      this.context.save();
      const scale = getScale(progress);
      const translateX = getTranslateX(progress);
      const translateY = getTranslateY(progress);
      this.context.translate(translateX, translateY);
      this.context.scale(scale, scale);
      this.context.globalAlpha = getAlpha(progress);
      const newWidth = IMAGE_WIDTH * this.canvasScale;
      this.context.drawImage(
        image,
        -newWidth / 2,
        -newWidth / 2,
        newWidth,
        newWidth
      )
      this.context.restore()
      return false;
    }
  }

  start() {
    const duration = random(2100, 2600);
    const timestamp = Date.now();
    const render = this.createRender(duration, timestamp);

    if(!render) {
      return;
    }

    this.renderList.push({
      render,
      duration,
      timestamp
    });

    if(!this.scanning) {
      this.scanning = true;
      requestAnimationFrame(this.scan.bind(this));
    }

    return this;
  }

  scan() {
    this.context.clearRect(0, 0, this.width, this.height);
    let index = 0;
    let length = this.renderList.length;

    if(length > 0) {
      requestAnimationFrame(this.scan.bind(this));
      this.scanning = true;
    } else {
      this.scanning = false;
    }

    while(index < length) {
      const child = this.renderList[index];

      if(!child || !child.render || child.render.call(null, (Date.now() - child.timestamp) / child.duration)) {
        // 结束了，删除动画
        this.renderList.splice(index, 1);
        length--;
      } else {
        index++;
      }
    }
  }
}

export default CanvasLike;