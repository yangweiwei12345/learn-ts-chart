import { useCallback, useMemo, useState } from 'react'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import { usePropertyAccessor, useTheme, useValueFormatter, Margin } from '@nivo/core'
import {
    DataProps,
    BarCommonProps,
    BarDatum,
    ComputedBarDatumWithValue,
    LegendData,
    BarLegendProps,
} from './types'
import { defaultProps } from './props'
import { generateGroupedBars, generateStackedBars, getLegendData } from './compute'

export const useBar = <RawDatum extends BarDatum>({
    indexBy = defaultProps.indexBy,   // country
    keys = defaultProps.keys,         // ['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']
    label = defaultProps.label,       // formattedValue
    tooltipLabel = defaultProps.tooltipLabel,   // (datum: ComputedDatum<RawDatum>) => `${datum.id} - ${datum.indexValue}`
    valueFormat,    // undefined
    colors = defaultProps.colors,   // {scheme: 'nivo'}
    colorBy = defaultProps.colorBy, // id
    /**
     * borderColor={ from: 'color', modifiers: [ ['darker', 1.6] ] }
     */
    borderColor = defaultProps.borderColor,
    /**
     * { from: 'color', modifiers: [
            ['darker', 1.6 ]
        ]}
     */
    labelTextColor = defaultProps.labelTextColor,
    groupMode = defaultProps.groupMode,   // stacked
    layout = defaultProps.layout,         // vertical
    reverse = defaultProps.reverse,       // false
    data,
    minValue = defaultProps.minValue,     // auto
    maxValue = defaultProps.maxValue,     // auto
    margin,                               // {top: 50, right: 130, bottom: 50, left: 60}
    width,
    height,
    padding = defaultProps.padding,       // 0.3
    innerPadding = defaultProps.innerPadding,   // 0
    valueScale = defaultProps.valueScale,       // {type: 'linear'}
    indexScale = defaultProps.indexScale,       // {type: 'band', round: true}
    initialHiddenIds = defaultProps.initialHiddenIds, // []
    enableLabel = defaultProps.enableLabel,           // true
    labelSkipWidth = defaultProps.labelSkipWidth,     // 12
    labelSkipHeight = defaultProps.labelSkipHeight,   // 12  
    legends = defaultProps.legends,
    legendLabel,    // undefined
}: {
    indexBy?: BarCommonProps<RawDatum>['indexBy']
    label?: BarCommonProps<RawDatum>['label']
    tooltipLabel?: BarCommonProps<RawDatum>['tooltipLabel']
    valueFormat?: BarCommonProps<RawDatum>['valueFormat']
    colors?: BarCommonProps<RawDatum>['colors']
    colorBy?: BarCommonProps<RawDatum>['colorBy']
    borderColor?: BarCommonProps<RawDatum>['borderColor']
    labelTextColor?: BarCommonProps<RawDatum>['labelTextColor']
    groupMode?: BarCommonProps<RawDatum>['groupMode']
    layout?: BarCommonProps<RawDatum>['layout']
    reverse?: BarCommonProps<RawDatum>['reverse']
    data: DataProps<RawDatum>['data']
    keys?: BarCommonProps<RawDatum>['keys']
    minValue?: BarCommonProps<RawDatum>['minValue']
    maxValue?: BarCommonProps<RawDatum>['maxValue']
    margin: Margin
    width: number
    height: number
    padding?: BarCommonProps<RawDatum>['padding']
    innerPadding?: BarCommonProps<RawDatum>['innerPadding']
    valueScale?: BarCommonProps<RawDatum>['valueScale']
    indexScale?: BarCommonProps<RawDatum>['indexScale']
    initialHiddenIds?: BarCommonProps<RawDatum>['initialHiddenIds']
    enableLabel?: BarCommonProps<RawDatum>['enableLabel']
    labelSkipWidth?: BarCommonProps<RawDatum>['labelSkipWidth']
    labelSkipHeight?: BarCommonProps<RawDatum>['labelSkipHeight']
    legends?: BarCommonProps<RawDatum>['legends']
    legendLabel?: BarCommonProps<RawDatum>['legendLabel']
}) => {
  /**
   * 空值合并运算符(??)
   * let a = 0, b = {test: '1'}
   * let c = a ?? b;   // 只有当a为null,undefined时c为b，a为0，c还是等于a
   */
    const [hiddenIds, setHiddenIds] = useState(initialHiddenIds ?? [])
    const toggleSerie = useCallback(id => {
        setHiddenIds(state =>
            state.indexOf(id) > -1 ? state.filter(item => item !== id) : [...state, id]
        )
    }, [])

    /**
      export const getPropertyAccessor = accessor =>
          isFunction(accessor) ? accessor : d => get(d, accessor)

      export const usePropertyAccessor = accessor =>
          useMemo(() => getPropertyAccessor(accessor), [accessor])
     */
    const getIndex = usePropertyAccessor(indexBy)   // d => get(d, indexBy)
    const getLabel = usePropertyAccessor(label)     // d => get(d, label)
    const getTooltipLabel = usePropertyAccessor(tooltipLabel)   // (datum) => `${datum.id} - ${datum.indexValue}`
    const formatValue = useValueFormatter(valueFormat)    // d => get(d, valueFormat)

    const theme = useTheme()
    console.log(theme);
    const getColor = useOrdinalColorScale(colors, colorBy)
    console.log(getColor, 'getColor');
    const getBorderColor = useInheritedColor<ComputedBarDatumWithValue<RawDatum>>(
        borderColor,
        theme
    )
    console.log(getBorderColor, 'getBorderColor')
    const getLabelColor = useInheritedColor<ComputedBarDatumWithValue<RawDatum>>(
        labelTextColor,
        theme
    )
    console.log(getLabelColor, 'getLabelColor')

    const generateBars = groupMode === 'grouped' ? generateGroupedBars : generateStackedBars
    const { bars, xScale, yScale } = generateBars({
        layout,
        reverse,
        data,
        getIndex,
        keys,
        minValue,
        maxValue,
        width,
        height,
        getColor,
        padding,
        innerPadding,
        valueScale,
        indexScale,
        hiddenIds,
        formatValue,
        getTooltipLabel,
        margin,
    })
    console.log(bars, xScale, yScale)

    // 过滤非法值，加上索引
    const barsWithValue = useMemo(
        () =>
            bars
                .filter(
                    (bar): bar is ComputedBarDatumWithValue<RawDatum> => bar.data.value !== null
                )
                .map((bar, index) => ({
                    ...bar,
                    index,
                })),
        [bars]
    )
    console.log(barsWithValue, 'barsWithValue');

    // 根据当前块宽高是否展示文字
    const shouldRenderBarLabel = useCallback(
        ({ width, height }: { height: number; width: number }) => {
            if (!enableLabel) return false
            if (labelSkipWidth > 0 && width < labelSkipWidth) return false
            if (labelSkipHeight > 0 && height < labelSkipHeight) return false
            return true
        },
        [enableLabel, labelSkipWidth, labelSkipHeight]
    )

    const legendData = useMemo(
        () =>
            keys.map(key => {
                const bar = bars.find(bar => bar.data.id === key)

                return { ...bar, data: { id: key, ...bar?.data, hidden: hiddenIds.includes(key) } }
            }),
        [hiddenIds, keys, bars]
    )
    console.log(legendData, 'legendData');

    const legendsWithData: [BarLegendProps, LegendData[]][] = useMemo(
        () =>
            legends.map(legend => {
                const data = getLegendData({
                    bars: legend.dataFrom === 'keys' ? legendData : bars,
                    direction: legend.direction,
                    from: legend.dataFrom,
                    groupMode,
                    layout,
                    legendLabel,
                    reverse,
                })

                return [legend, data]
            }),
        [legends, legendData, bars, groupMode, layout, legendLabel, reverse]
    )
    console.log(legendsWithData, 'legendsWithData')

    return {
        bars,
        barsWithValue,
        xScale,
        yScale,
        getIndex,
        getLabel,
        getTooltipLabel,
        formatValue,
        getColor,
        getBorderColor,
        getLabelColor,
        shouldRenderBarLabel,
        hiddenIds,
        toggleSerie,
        legendsWithData,
    }
}
