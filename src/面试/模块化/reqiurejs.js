(function(win) {
  // 缓存
  const cache = {};
  // module
  let module = null;
  // 
  const tasks = [];

  // 创建script标签，用来加载文件模块
  const createNode = function(depend) {
    let script = document.createElement("script");
    script.src = `./${depend}.js`;
    // 嵌入自定义data-moduleName属性，可由dataset获取
    script.setAttribute("data-moduleName", depend);
    let fs = document.getElementsByTagName('script')[0];
    fs.parentNode.insertBefore(script, fs);
    return script;
  }

  // 判断是否所有依赖都以解析完成
  const hasAlldependencies = function(dependencies) {
    let hasValue = true;
    dependencies.forEach(depd => {
      if(!cache.hasOwnProperty(depd)) {
        hasValue = false;
      }
    });

    return hasValue;
  }

  // 递归执行callback
  const implementCallback = function(callbacks) {
    if(callbacks.length) {
      callbacks.forEach((callback, index) => {
        // 所有依赖解析都已完成
        if(hasAlldependencies(callback.dependencies)) {
          const returnValue = callback.callback(...callback.dependencies.map(it => cache[it]));
          if(callback.name) {
            cache[callback.name] = returnValue;
          }
          tasks.splice(index, 1);
          implementCallback(tasks);
        }
      })
    }
  }

  // 根据依赖加载js文件
  const require = function(dependencies, callback) {
    if(!dependencies.length) {  // 如果没有依赖项
      // 将回调函数执行结果放入value字段中
      module = {
        value: callback()
      };
    } else {    // 此文件有依赖项
      module = {
        dependencies,
        callback
      };
      tasks.push(module);
      // 遍历依赖文件
      dependencies.forEach(function(dep) {
        // 当前模块是否已经加载
        if(!cache[dep]) {
          // 前端使用生成script加载js，监听onload函数判断js时候加载完成
          createNode(dep).onload = function() {
            // 获取嵌入属性
            let modulename = this.dataset.modulename;
            // 校验module中是否存在value属性
            if(module.hasOwnProperty('value')) {
              // 存在，将值（导出值）存入缓存
              cache[modulename] = module.value;
            } else {
              // 不存在
              module.name = modulename;
              // 判断是否当前模块是不是所有的依赖都还在完成
              if(hasAlldependencies(module.dependencies)) {
                // 执行回调，抛出依赖返回值
                cache[modulename] = callback(...module.dependencies.map(v => cache[v]));
              }
            }
            // 递归调用执行callback
            implementCallback(tasks);
          }
        }
      });
    }
  }

  win.require = require;
  win.define = require;



})(window);