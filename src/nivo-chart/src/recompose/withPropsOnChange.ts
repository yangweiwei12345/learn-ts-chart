import { Component, createFactory } from 'react';
import { polyfill } from 'react-lifecycles-compat';  // 使react的新Api能够在旧版本的react上使用
import { setDisplayName } from './setDisplayName';
import { shallowEqual } from './shallowEqual';
import { InferableComponentEnhancerWithProps, Mapper, PredicateDiff } from './types';
import { pick } from './utils';
import { wrapDisplayName } from './wrapDisplayName';

export const withPropsOnChange = (
  shouldMapOrKeys,
  propsMapper
) => (BaseComponent) => {
  const factory = createFactory(BaseComponent);
  const shouldMap = 
    typeof shouldMapOrKeys === 'function'
      ? shouldMapOrKeys
      : (props, nextProps) => 
        !shallowEqual(pick(props, shouldMapOrKeys), pick(nextProps, shouldMapOrKeys));
  
  class WithPropsOnChange extends Component {
    state = {
      computedProps: propsMapper(this.props),
      prevProps: this.props
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if(shouldMap(prevState.prevProps, nextProps)) {
        return {
          computedProps: propsMapper(nextProps),
          prevProps: nextProps,
        }
      }

      return {
        prevProps: nextProps
      }
    }

    render() {
      return factory({
        ...this.props,
        ...this.state.computedProps
      })
    }
  }

  polyfill(WithPropsOnChange);

  if(process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withPropsOnChange'))(
      WithPropsOnChange
    )
  }

  return WithPropsOnChange;
}