import * as React from 'react';
import { setDisplayName } from '../';

test('setDisplayName 设置静态属性', () => {
  const BaseComponent: React.ComponentType = () => <div></div>;
  const NewComponent = setDisplayName('Foo')(BaseComponent);

  expect(NewComponent.displayName).toBe('Foo');
})