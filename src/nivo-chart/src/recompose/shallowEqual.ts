/**
 * 
 */

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 特殊情况
 */
function is(x: unknown, y: unknown): boolean {
  if(x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }

  // step: NaN == NaN NaN不等于NaN返回是true
  return x !== x && y !== y;

}


/**
 * 通过迭代对象上的键并在任何键的值在参数之间不严格相等时返回 false 来执行相等。 当所有键的值严格相等时返回真。
 */
export function shallowEqual(
  objA: Record<string, unknown>,
  objB: Record<string, unknown>
): boolean {
  if(is(objA, objB)) {
    return true;
  }

  if(typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if(keysA.length !== keysB.length) {
    return false;
  }

  for(let i = 0; i < keysA.length; i++) {
    if(!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}