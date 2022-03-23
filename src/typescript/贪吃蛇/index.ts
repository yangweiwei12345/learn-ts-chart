// 定义食物
class Food {
  // 定义一个属性表示食物所对应的元素
  element: HTMLElement;

  constructor() {
    // 获取页面中的food元素
    this.element = document.getElementById('food')!;
  }

  // 获取食物X轴坐标的方法
  get X() {
    return this.element.offsetLeft;
  }

  get Y() {
    return this.element.offsetTop;
  }

  change() {
    // 位置最小0，最大290
    // 移动一格大小都是10的倍数

    let left = Math.round(Math.random() * 29) * 10;
    let top = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left +  'px';
    this.element.style.top = top + 'px';
  }
}

let food = new Food();
food.change();
console.log(food.X)
