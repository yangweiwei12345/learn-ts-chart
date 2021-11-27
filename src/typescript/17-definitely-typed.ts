// 类型声明
import { camelCase } from 'loadsh';

// 类型声明 如果loadsh没有对应的
declare function camelCase(input: string): string

const res = camelCase('hello typed');

export {};

