import { ITodo } from ".";

class TodoDom {
  private static instance: TodoDom;
  private oTodoList: HTMLElement;

  constructor(oTodoList: HTMLElement) {
    this.oTodoList = oTodoList;
  }

  public static create(oTodoList: HTMLElement) {
    if(!TodoDom.instance) {
      TodoDom.instance = new TodoDom(oTodoList);
    }

    return TodoDom.instance;
  }

  public addItem(todo: ITodo): Promise<void> {
    return new Promise((resolve, reject) => {

    })
  }

  public removeItem(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      
    })
  }

  public toggleItem(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      
    })
  }

  private toduView({ id, content, completed }: ITodo): string {
    return ``
  }


}

export default TodoDom;