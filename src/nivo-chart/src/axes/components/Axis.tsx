import { useMemo, memo } from "react";
import * as React from 'react';
import { useSpring, useTransition, animated } from '@react-spring/web';
import { useTheme, useMotionConfig } from '../../core';
import { ScaleValue, AnyScale } from '../../scales';
import { computeCartesianTicks, getFormatter } from '../compute';
import { AxisTick } from './AxisTick';
import { AxisProps } from '../types';