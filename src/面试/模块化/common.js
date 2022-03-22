const path = require('path');
const fs = require('fs');
const vm = require('vm');   // 虚拟环境

let n = 0;

// 构造函数Module
function Module(filename) {
  this.id = n++;              // 唯一id
  this.filename = filename;   // 文件绝对路径
  this.exports = {};          // 模块对应的导出结果
}

// 存放可解析的文件模版拓展名
Module._extensions = ['.js'];
// 缓存
Module._cache = {};
// 拼凑成闭包的数组
Module.wrapper = ['(function(exports, require, module){', '\r\n})'];

// 没写拓展名，默认添加拓展名
Module._resolveFilename = function(p) {
  p = path.join(__dirname, p);
  if(!/\.\w+$/.test(p)) {
    // 如果没有拓展名，尝试添加拓展名
    for(let i = 0; i < Module._extensions.length; i++) {
      // 拼接出一个路径
      let filePath = p + Module._extensions[i];
      // 判断文件是否存在
      try {
        fs.accessSync(filePath);

        return filePath;
      } catch(e) {
        throw new Error('module not found');
      }
    }
  } else {
    return p;
  }
}

// 加载模块本身
Module.prototype.load = function() {
  // 解析文件名后缀 file.js -> js
  let extname = path.extname(this.filename);
  // 调用对应后缀文件加载方法
  Module._extensions[extname](this)
}

// 后缀名为js的加载方法
Module._extensions['.js'] = function(module) {
  // 读文件
  let content = fs.readFileSync(module.filename, 'utf-8');
  console.log(module.filename + '文件内容：', content);
  // 形成闭包函数字符串
  let script = Module.wrapper[0] + content + Module.wrapper[1];
  console.log("文件内容拼接结果：", script)
  /**
   * script = 
   * (function(exports, require, module){
   *    module.exports = {
          a: 1,
          b: 2,
          c() {
            return 3;
          }
        }
      })
   */
  // 创建沙箱环境，运行并返回结果
  let fn = vm.runInThisContext(script);
  console.log("执行结果：", fn)
  // 执行闭包函数，将被闭包函数包裹的加载内容
  /**
   * 
   */
  fn.call(module, module.exports, req, module);
}

// 仿require方法，实现加载模块
function req(path) {
  // 根据输入的路径，转换成绝对路径
  let filename = Module._resolveFilename(path);
  console.log('绝对路径文件名：', filename);
  // 查看缓存是否存在，存在直接返回缓存
  if(Module._cache[filename]) {
    return Module._cache[filename].exports;
  }
  // 通过文件名创建一个Module实例
  let module = new Module(filename);
  console.log("module实例：", module)
  // 加载文件，执行对应加载方法
  module.load();
  // 入缓存
  Module._cache[filename] = module;

  return module.exports;
}

let str = req('./demo/test');
console.log(str);
