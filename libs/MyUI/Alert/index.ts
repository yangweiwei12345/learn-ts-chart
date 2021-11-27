import Template from './Template';
import { IAlertOptions, DEFAULT_VALUES } from './typings';
import $ from 'jquery';

class Alert extends Template {
  private _headerTitle: string;
  private _alertText: string;
  private _duration: number;
  private _oAlert: JQuery<HTMLElement>;
  private _oXIcon: JQuery<HTMLElement>;
  private _oInner: JQuery<HTMLElement>

  constructor(options: IAlertOptions) {
    super();
    this._headerTitle = options.headerTitle || DEFAULT_VALUES.HEADER_TITLE;
    this._alertText = options.alertText || DEFAULT_VALUES.ALERT_TEXT;
    this._duration = options.duration || DEFAULT_VALUES.DURATION;

    this.render();
    this.bindEvent();
  }

  private bindEvent() {
    this._oXIcon.on('click', this.hide.bind(this));
    this._oAlert.on('click', this.hide.bind(this));
    this._oInner.on('click', (e) => e.stopPropagation());
  }

  private render() {
    document.body.appendChild(this.alertView({
      headerTitle: this._headerTitle,
      alertText: this._alertText
    }))
    this._oAlert = $('.alert');
    this._oXIcon = $('.icon');
    this._oInner = $('.inner');
  }

  public static create(options: IAlertOptions) {
    return new Alert(options);
  }

  public show(type: string, options: IAlertOptions) {
    console.log(type, options);
    const { duration } = options;
    duration && (this._duration = duration)
    this._oAlert.fadeIn(this._duration);
  }

  public hide() {
    this._oAlert.fadeOut();
  }
}

export default Alert;