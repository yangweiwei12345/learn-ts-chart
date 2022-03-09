// 1、数组去重复

// es5
function unique(arr) {
  let result = arr.filter((item, index, array) => {
    return array.indexOf(item) === index;
  })

  return result;
}

// es6
function unique(arr) {
  return [...new Set(arr)];
}

