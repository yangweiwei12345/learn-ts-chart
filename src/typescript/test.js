function getTargetIndex(nums, target) {
  if(!Array.isArray(nums)) return false;
  if(nums.length <= 1) return false;

  let length = nums.length;
  for(let i = 0; i < length; i++) {
    let current = nums[i];

    let index = nums.indexOf(target - current);

    if(index !== -1 && index !== i) {
      return index > i ? [i, index] : [index, i];
    }
  }
  return false;

}