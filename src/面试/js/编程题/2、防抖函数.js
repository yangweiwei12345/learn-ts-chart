function debounce(fn, wait) {
  let timer;

  return function() {
    let context = this;

    if(timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      fn.apply(context, arguments)
    }, wait);
  }
}