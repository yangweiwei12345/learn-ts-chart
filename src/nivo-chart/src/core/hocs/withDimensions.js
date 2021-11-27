import PropTypes from 'prop-types';
import { marginPropType } from '../props';
import { defaultMargin } from '../defaults';

/**
 * 
 */
export default () => 
  compose(
    defaultProps({
      margin: defaultMargin
    }),
    setPropTypes({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      margin: marginPropType
    }),
    withPropsOnChange(
      (props, nextProps) => 
        props.width !== nextProps.width ||
        props.height !== nextProps.height ||
        !isEqual(props.margin, nextProps.margin),
      props => {
        const margin = Object.assign({}, defaultMargin, props.margin);

        return {
          margin,
          width: props.width - margin.left - margin.right,
          height: props.height - matgin.top - margin.bottom,
          outerWidth: props.width,
          outerHeight: props.height
        }
      }
    )
  )