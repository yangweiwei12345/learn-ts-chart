const fs = require('fs');
// const parser = require('@babel/parser');

function createAsset(filename) {
  const content = fs.readFileSync(filename, {
    encoding: "utf-8"
  });

  console.log(content);
  // const ast = parser.parse(content);
  console.log(ast);

  return {};
}

createAsset("./demo/entry.js");
