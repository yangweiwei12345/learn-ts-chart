/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { compose, setPropTypes, defaultProps, withPropsOnChange } from '@nivo/recompose'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import { marginPropType } from '../props'
import { defaultMargin } from '../defaults'

/**
 * This HOC watch width, height & margin props change
 * and returns new width/height plus outer dimensions.
 * Using it prevent from having a new ref each time
 * we pass through the component, useful for shallow comparison.
 * It also add required propTypes & set default margin.
 * 这个 HOC 观察宽度、高度和边距道具改变并返回新的宽度/高度加上外部尺寸。 
 * 使用它可以防止每次我们通过组件时都有一个新的 ref，这对于浅比较很有用。 
 * 它还添加了所需的 propTypes 并设置了默认边距。
 */
export default () =>
    compose(
        defaultProps({
            margin: defaultMargin,
        }),
        setPropTypes({
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            margin: marginPropType,
        }),
        withPropsOnChange(
            (props, nextProps) =>
                props.width !== nextProps.width ||
                props.height !== nextProps.height ||
                !isEqual(props.margin, nextProps.margin),
            props => {
                const margin = Object.assign({}, defaultMargin, props.margin)

                return {
                    margin,
                    width: props.width - margin.left - margin.right,
                    height: props.height - margin.top - margin.bottom,
                    outerWidth: props.width,
                    outerHeight: props.height,
                }
            }
        )
    )
