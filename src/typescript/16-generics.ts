// 泛型

export {}

function createNUmberArray(length: number, value: number): number[] {

  const arr = Array<number>(length).fill(value);

  return arr;
  
}

const res = createNUmberArray(3, 100);
// res => [100, 100, 100]

// 泛型 定义时不能明确的参数使用时再去传递
function createArray<T> (length: number, value: T): T[] {

  const arr = Array<T>(length).fill(value);

  return arr;
}

const res1 = createArray<string>(3, 'foo');