import TodoList from './components/TodoList';
import { ITodoData } from './typings';

;((doc) => {

  const oApp: HTMLElement = document.querySelector('#app');

  const todoData: ITodoData[] =  [
    {
      id: 1,
      content: '123',
      completed: true
    },
    {
      id: 2,
      content: '42323',
      completed: true
    },
    {
      id: 3,
      content: '7rw',
      completed: true
    }
  ];

  const init = (): void => {
    const todoList: TodoList = new TodoList(oApp, todoData);

    todoList.init();
  }

  init();
})(document)