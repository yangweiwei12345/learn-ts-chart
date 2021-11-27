/**
 * 从对象中取出指定keys的值，返回新对象
 * @param obj 
 * @param keys 
 * @returns
 */
export const pick = (obj: Record<string, unknown>, keys: string[]) => {
  const result: Record<string, unknown> = {};

  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if(obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }

  return result;
}