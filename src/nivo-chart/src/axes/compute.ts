import { timeFormat } from 'd3-time-format';        // 时间格式化
import { format as d3Format } from 'd3-format';     // 数字精度相关格式化
// @ts-ignore
import { textPropsByEngine } from '../core';
import { ScaleValue, AnyScale, TicksSpec, getScaleTicks, centerScale } from '../scales';
// import { Point, ValueFormatter, Line } from './types';

const isArray = value => Array.isArray(value);

export const computeCartesianTicks = ({
    axis,
    scale,
    ticksPosition,
    tickValues,
    tickSize,
    tickPadding,
    tickRotation,
    engine = 'svg'
}) => {
    const values = getScaleTicks(scale, tickValues);
}