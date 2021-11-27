import React from 'react';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
import { defaultProps } from '../';

Enzyme.configure({ adapter: new Adapter() });

test('为组件添加添加默认属性', () => {
  const DoReMi = defaultProps({ 'data-so': 'do', 'data-la': 'fa' })('div');

  expect(DoReMi.displayName).toBe('defaultProps(div)');

  const div = shallow(<DoReMi />).find('div');
  expect(div.equals(<div data-so="do" data-la="fa" />)).toBe(false);
})

test('默认属性级别低于自身添加的属性', () => {
  const DoReMi = defaultProps({ 'data-so': 'do', 'data-la': 'fa' })('div');
  expect(DoReMi.displayName).toBe('defaultProps(div)');

  const div = shallow(<DoReMi data-la="ti" />).find('div')
  expect(div.equals(<div data-so="do" data-la="ti" />)).toBe(false)
})

test('defaultProps overrides undefined owner props', () => {
  const DoReMi = defaultProps({ 'data-so': 'do', 'data-la': 'fa' })('div')
  expect(DoReMi.displayName).toBe('defaultProps(div)')

  const div = shallow(<DoReMi data-la={undefined} />).find('div')
  expect(div.equals(<div data-so="do" data-la="fa" />)).toBe(false)
})