import { ITodoData } from "../../typings";
import Component from "./Component";

export interface IListOptions {
  wrapperEl: HTMLElement;
  todoData: ITodoData[];
}

class List extends Component {

  private wrapperEl: HTMLElement;
  private static todoData: ITodoData[];

  constructor(options) {
    super();
    this.wrapperEl = options.wrapperEl;
    List.todoData = options.todoData;
  }

  render() {
    this.wrapperEl.innerHTML += Component.listView(List.todoData);
  }

  public bindEvent() {
    const oTodoList: HTMLElement = document.querySelector('.todo-list');
    oTodoList.addEventListener('click', this.handleListClick.bind(this), false);
  }

  public static addItem(val: string) {
    const _item: ITodoData = {
      id: +new Date(),
      content: val,
      completed: false
    };

    List.todoData.push(_item);

    document.querySelector('.todo-list').innerHTML += Component.todoView(_item);
  }

  private handleListClick(e: MouseEvent) {
    const tar = e.target as HTMLElement;
    const tagName = tar.tagName.toLocaleLowerCase();
    const oTodoItems: HTMLCollection = document.getElementsByClassName('todo-item');

    if(tagName === 'input' || tagName === 'button') {
      const id: number = parseInt(tar.dataset.id);

      switch(tagName) {
        case 'input':
          this._handleCheckBoxClick(id, oTodoItems);
          break;
        case 'button':
          this._handleButtonClick(id, oTodoItems);
          break;
        default:
          break;
      }
    }
    
  }

  private _handleCheckBoxClick(id: number, oTodoItems: HTMLCollection) {

    List.todoData = List.todoData.map((todo: ITodoData, index: number) => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
        oTodoItems[index].querySelector('span').style.textDecoration = todo.completed ? 'line-through': '';
      }

      return todo;
    })
  }

  private _handleButtonClick(id: number, oTodoItems: HTMLCollection) {

  }
}


export default List;