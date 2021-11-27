
export {};


class Person {
  name: string
  private age: number
  protected readonly gender: boolean

  constructor(name: string, age: number) {

    this.name = name;
    this.age = age;
  }

  sayHi(msg: string): void {

  }
}

const tom = new Person('tom', 18);
console.log(tom.name);
// console.log(tom.age)
// console.log(tom.gender)
// tom.gender = true;

class Student extends Person {
  private constructor(name: string, age: number) {
    super(name, age);
    console.log(this.gender);
  }

  static create(name: string, age) {
    return new Student(name, age);
  }
}

// const andy = new Student('andy', 30);
const andy = Student.create('andy', 30);

// 接口