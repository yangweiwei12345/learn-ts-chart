import { ComponentClass, ComponentType } from 'react';

interface ComponentEnhancer<TInner, TOuter> {
  (component: ComponentType<TInner>): ComponentClass<TOuter>
}

export const compose = <TInner, TOuter>(...funcs: Function[]): ComponentEnhancer<TInner, TOuter> =>
  funcs.reduce<ComponentEnhancer<TInner, TOuter>>(
    (a, b) => (...args) => a(b(...args)),
    arg => arg as any
  ) as ComponentEnhancer<TInner, TOuter>