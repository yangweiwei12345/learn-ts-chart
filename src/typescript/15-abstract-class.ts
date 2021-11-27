// 抽象类

export {}

/**
 * 一般是比较大的类，比如动物类，不像接口，他可以有具体的实现
 */
abstract class  Animal {
  eat(food: string): void {
    console.log(`呼噜呼噜的吃：${food}`)
  }

  // 抽象方法
  abstract run(distance: number): void;
}

class Dog extends Animal {
  run(distance: number): void {
    console.log(`爬行：${distance}`)
  }
}

const d = new Dog();
d.eat('');
d.run(12)