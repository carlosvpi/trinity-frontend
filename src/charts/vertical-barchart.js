import * as d3 from 'd3'
import { indexBy, prop } from 'ramda'
import { selectOrAppend, addTooltip, publicationPalette } from './utils'

export default (div, { dimensions, tuples }, { dimensionKey, propName }) => {
    // Data
    const dimension = dimensions[dimensionKey]
    const indexedTuples = indexBy(prop(dimension.id), tuples)
    const sortedDimensions = dimension.members.sort((a, b) => indexedTuples[b][propName] - indexedTuples[a][propName])
    // SVG Node
    const svg = selectOrAppend(d3.select(div), 'svg')

    // Presentation
    const barHeight = 20;
    const barThickness = 15;
    const { clientWidth } = svg.node()
    const height = barHeight * 2 * dimension.members.length
    const margin = {
        top: 20,
        right: 10,
        bottom: 10,
        left: 10
    }
    const chartWidth = clientWidth - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom
    svg.style('height', `${height}px`)

    // Scale
    const x = d3.scaleLinear()
        .domain([0, d3.max(tuples, prop(propName))])
        .range([0, chartWidth])
    const y = d3.scaleLinear()
        .domain([0, dimension.members.length])
        .range([0, chartHeight])

    // Axis
    const yAxis = d3.axisRight(y)
        .ticks(dimension.members.length)
        .tickFormat(index => sortedDimensions[index])

    // Nodes
    const verticalBarchart = selectOrAppend(svg, 'g.chart')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    selectOrAppend(verticalBarchart, 'g.y-axis.only-labels')
        .call(yAxis)
        .selectAll('.tick')
        .select('text')
        .attr('dy', -5)
        .attr('x', 0)

    // Bars
    const bars = selectOrAppend(verticalBarchart, 'g.chart')
        .selectAll('rect.segment')
        .data(sortedDimensions)

    bars.exit().remove()
    bars.enter()
        .append('rect')
        .attr('class', d => `segment autostyle ${dimensionKey}-${d}`)
        .style('fill', group => publicationPalette[group])
        .merge(bars)
        .attr('y', (_, index) => y(index))
        .attr('width', d => x(indexedTuples[d][propName]))
        .attr('height', barThickness)
        .each(function(d) {
            addTooltip(`${d}: ${indexedTuples[d][propName]}`, d3.select(this))
        })
}
