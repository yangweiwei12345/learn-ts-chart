export interface IAlertOptions {
  duration?: number;
  headerTitle?: string;
  alertText?: string
}

export enum DEFAULT_VALUES {
  HEADER_TITLE = '',
  ALERT_TEXT = '',
  DURATION = 150
}