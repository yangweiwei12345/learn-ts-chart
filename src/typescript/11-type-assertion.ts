// 类型断言

export {};

const nums = [110, 220, 330];

const res = nums.find(i => i > 0)

const square = res * res;


// 断言
const num1 = res as number;

const num2 = <number>res; // jsx下不能使用