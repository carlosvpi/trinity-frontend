import * as d3 from 'd3'
import { reduce } from 'ramda'
import { selectOrAppend, addTooltip } from './utils'

export default (div, { dimensions, tuples }, { dimensionKey, seriesKey, propName }) => {
    // Data
    const dimension = dimensions[dimensionKey]
    const series = dimensions[seriesKey]
    const seriesIds = series.members
    const nestedData = d3.nest()
        .key(d => d[dimension.id])
        .rollup(d => {
            return reduce((acc, tuple) => Object.assign(acc, {
                [dimension.id]: tuple[dimension.id],
                [tuple[series.id]]: tuple[propName]
            }), {})(d)
        })
        .object(tuples)

    // SVG Node
    const svg = selectOrAppend(d3.select(div), 'svg')

    // Presentation
    const groupPalette = ['#42f495', '#2fd87e', '#22c16d', '#19a85c', '#0f8446', '#096634', '#09542b', '#2b704a', '#3f825d', '#5cb584'].reverse()
    const { clientWidth, clientHeight } = svg.node()
    const margin = {
        top: 10,
        right: 10,
        bottom: 30,
        left: 10
    }
    const chartWidth = clientWidth - margin.left - margin.right
    const chartHeight = clientHeight - margin.top - margin.bottom

    // D3 objects
    const stack = d3.stack()
        .keys(seriesIds)
        .offset(d3.stackOffsetWiggle)
        (nestedData.reduce((acc, key, tuple) => [...acc, tuple], [])) // to array

    // Scale
    const x = d3.scaleLinear()
        .domain([0, dimension.members.length - 1])
        .range([0, chartWidth])
        .nice()
    const offsetToDimension = x.invert
    const y = d3.scaleLinear()
        .domain([d3.min(stack[0], ([d]) => d), d3.max(stack[stack.length - 1], ([_, d]) => d)])
        .range([chartHeight, 0])

    // Axis
    const xAxis = d3.axisBottom(x)
        .ticks(dimension.members.length)
        .tickFormat((_, index) => dimension.members[index])

    const area = d3.area()
        .curve(d3.curveCardinal)
        .x((d, index) => x(index))
        .y0(([bottom]) => y(bottom))
        .y1(([bottom, top]) => y(top))

    // Nodes
    const streamGraph = selectOrAppend(svg, 'g.streamgraph')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    selectOrAppend(streamGraph, 'g.x-axis')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(xAxis)

    // Bars
    const streams = selectOrAppend(streamGraph, 'g.chart')
        .selectAll('path.segment')
        .data(series.members)

    streams.exit().remove()
    streams.enter()
        .append('path')
        .classed('segment', true)
        .classed('autostyle', true)
        .merge(streams)
        .style('fill', group => groupPalette[group])
        .style('stroke', group => groupPalette[group])
        .attr('d', (_, index) => area(stack[index]))
        .each(function(group) {
            addTooltip(() => {
                const dimensionIndex = Math.round(offsetToDimension(d3.event.offsetX - margin.left))
                const dimensionMember = dimension.members[dimensionIndex]
                return `${group}, ${dimensionMember}: ${nestedData[dimensionMember][group]}`
            }, d3.select(this))
        })
}
