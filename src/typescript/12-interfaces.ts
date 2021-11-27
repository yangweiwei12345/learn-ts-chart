// 接口

export {};

/**
 * 接口：约束对象的结构，实现一个接口必须要拥有接口的所有成员
 */
interface Post {
  title: string
  content: string
  subtitle?: string   // 可选
  readonly summary: string  // 制度
}

function printPost(post: Post) {
  console.log(post.title);
  console.log(post.content);
}

const hello: Post = {
  title: 'title',
  content: 'c',
  summary: ''
}
printPost(hello);

// hello.summary = '';

// ----------------

// 动态成员
interface Cache {
  [prop: string]: string
}

const cache: Cache = {};

cache.foo = 'value';