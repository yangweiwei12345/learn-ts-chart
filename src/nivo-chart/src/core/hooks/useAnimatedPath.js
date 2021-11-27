import { interpolateString } from 'd3-interpolate';
import { useEffect, useMemo, useRef } from 'react';
import { useSpring, to } from '@react-spring/web';
import { useMotionConfig } from '../motion';