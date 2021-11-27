import { createElement, createFactory } from 'react';
import { setDisplayName } from './setDisplayName';
import { DefaultingInferableComponentEnhancer } from './types';
import { wrapDisplayName } from './wrapDisplayName';

export const defaultProps = <T = {}>(props: T): DefaultingInferableComponentEnhancer<T> => (
  BaseComponent: any
): any => {
  const factory = createFactory(BaseComponent);
  const DefaultProps = (ownerProps: any) => factory(ownerProps);

  DefaultProps.defauleProps = props;

  if(process.env.NODE_ENV !== 'production') {
    /**
     * let wrapName = wrapDisplayName(BaseComponent, 'defaultProps') => 'defaultProps(BaseComponent.displayName)'
     * setDisplayName(wrapDisplayName(BaseComponent, 'defaultProps')) = (wrapName) => ('displayName', wrapName) => BaseComponent => { BaseComponent[key] = value; return BaseComponent; }
     */
    return setDisplayName(wrapDisplayName(BaseComponent, 'defaultProps'))(DefaultProps);
  }

  return DefaultProps;
}