// 函数类型

export {};

function func1(a: number, b: number = 10, c?: number, ...rest: number[]): string {
  return 'func1';
}



const func2 = function(a: number, b: number): string {
  return 'func2'
}
