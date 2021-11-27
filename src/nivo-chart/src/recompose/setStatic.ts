import { ComponentType } from 'react';

export const setStatic = (
  key: string,
  value: any
): (<T extends ComponentType<any>>(component: T) => T) => BaseComponent => {
  BaseComponent[key] = value;

  return BaseComponent;
}