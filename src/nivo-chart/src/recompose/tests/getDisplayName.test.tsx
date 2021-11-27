import { Component } from 'react';
import { getDisplayName } from '../';

test('getDisplayName 获取组件名称', () => {
  class SomeComponent extends Component {
    render() {
        return <div />
    }
  }

  class SomeOtherComponent extends Component {
      static displayName = 'CustomDisplayName'
      render() {
          return <div />
      }
  }

  function YetAnotherComponent() {
      return <div />
  }

  expect(getDisplayName(SomeComponent)).toBe('SomeComponent');
  expect(getDisplayName(SomeOtherComponent)).toBe('CustomDisplayName')
  expect(getDisplayName(YetAnotherComponent)).toBe('YetAnotherComponent')
  expect(getDisplayName(() => <div />)).toBe('Component')
  expect(getDisplayName('div')).toBe('div')
})