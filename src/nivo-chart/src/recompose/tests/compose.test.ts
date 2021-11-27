import { compose } from '../';

// 函数从右向左执行
test('compose 函数从右向左执行', () => {
  const double = (x: number) => x * 2;
  const square = (x: number) => x * x;

  expect(compose(square)(5)).toBe(25);
  expect(compose(square, double)(5)).toBe(100);
  expect(compose(double, square, double)(5)).toBe(200);
})

// compose 支持多个参数
test('compose 支持多个参数', () => {
  const square = (x: number) => x * x;
  const add = (x: number, y: number) => x + y;

  expect(compose(square, add)(1, 3)).toBe(16);
})

// 如果不给参数将返回恒等函数
test('compose 如果不给参数将返回恒等函数', () => {
  expect(compose()(1, 3)).toBe(1);
  expect(compose()(3)).toBe(3);
  expect(compose()()).toBe(undefined);
})

// 如果只传入一个函数，则返回这个函数的值
test('compose 如果只传入一个函数，则返回这个函数的值', () => {
  const fn = (c: number) => c * c;
  expect(compose(fn)(3)).toBe(fn(3));
})

