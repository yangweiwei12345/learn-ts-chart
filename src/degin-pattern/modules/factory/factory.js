/**
 * 工厂模式
 */

import { ModalTypes } from './typing';

class Modal {
  constructor(status) {
    this.status = status;
  }

  get className() {
    let classStr = 'modal ';
    switch(this.status) {
      case ModalTypes.SUCCESS:
        classStr += 'success';
        break;
      case ModalTypes.WARNING:
        classStr += 'warning';
        break;
      case ModalTypes.ERROR:
        classStr += 'error';
        break;
      default:
        break;
    }

    return classStr;
  }

  static checkStatusIsExist(types, status) {

  }
}

class SuccessModal extends Modal {
  constructor() {
    super(ModalTypes.SUCCESS);
  }
}

class WarningModal extends Modal {
  constructor() {
    super(ModalTypes.WARNING)
  }
}


class ErrorModal extends Modal {
  constructor() {
    super(ModalTypes.ERROR)
  }
}

class ModalFactory {
  constructor(dom) {
    this.dom = dom;
  }

  create(title, status) {
    const dom = this.dom;
    let modal = null;

    switch(status) {
      case ModalTypes.SUCCESS:
        modal = new SuccessModal(title);
        break;
      case ModalTypes.WARNING:
        modal = new WarningModal(title);
        break;
      case ModalTypes.ERROR:
        modal = new ErrorModal(title);
        break;
      default:
        break;
    }
    
    dom.getElementByTagName('header')[0]
  }
}

export default ModalFactory;