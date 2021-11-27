import { Alert } from '../libs/MyUI';

;((doc) => {

  const onShowAlert: HTMLElement = doc.querySelector('#showAlert')

  const alert = Alert.create({
    duration: 300,
    headerTitle: '这是我的第一个alert',
    alertText: '这是我的第一个alert这是我的第一个alert这是我的第一个alert这是我的第一个alert'
  });

  const init = (): void => {
    bindEvent();
  }

  function bindEvent(): void {
    onShowAlert.addEventListener('click', showAlert, false);
  }

  function showAlert(): void {
    alert.show('warning', {
      duration: 150,
      headerTitle: '这是我第二个title',
      alertText: '这是我的第二个内容'
    });
  }

  init();
})(document);