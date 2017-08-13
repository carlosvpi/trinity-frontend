import * as d3 from 'd3'
import { groupBy, prop } from 'ramda'
import { selectOrAppend, addTooltip, publicationPalette } from './utils'

export default (div, { dimensions, tuples }, { dimensionKey, seriesKey, propName }) => {
    // Data
    const dimension = dimensions[dimensionKey]
    const series = dimensions[seriesKey]
    const seriesIds = series.members
    const indexedTuples = groupBy(prop(series.id), tuples)

    // SVG Node
    const svg = selectOrAppend(d3.select(div), 'svg')

    // Presentation
    const { clientWidth, clientHeight } = svg.node()
    const margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        radius: 15
    }
    const chartWidth = clientWidth - margin.left - margin.right
    const chartHeight = clientHeight - margin.top - margin.bottom
    const chartRadius = Math.min(chartWidth, chartHeight) / 2 - margin.radius

    // Scale
    const circular = d3.scaleLinear()
        .domain([0, dimension.members.length])
        .range([0, Math.PI * 2])
    const radial = d3.scaleLinear()
        .domain(d3.extent(tuples, tuple => tuple[propName]))
        .range([0, chartRadius])
        .nice()

    // Axis
    const radialAxis = d3.axisLeft(radial)

    // Nodes
    const radialchart = selectOrAppend(svg, 'g.radialchart')
        .attr('transform', `translate(${margin.left + chartWidth / 2}, ${margin.top + chartRadius + margin.radius})`)

    // Trends
    const radialLine = d3.radialLine()
        .angle((_, index) => circular(index))
        .radius(tuple => radial(tuple[propName]))
        .curve(d3.curveNatural)
    const radialTrends = selectOrAppend(radialchart, 'g.chart')
        .selectAll('path.segment')
        .data(series.members)

    radialTrends.exit().remove()
    radialTrends.enter()
        .append('path')
        .attr('class', d => `segment autostyle ${seriesKey}-${d}`)
        .merge(radialTrends)
        .style('fill', group => publicationPalette[group])
        .style('fill-opacity', 0.05)
        .style('stroke-width', 2)
        .style('stroke', group => publicationPalette[group])
        .attr('d', serie => radialLine([...indexedTuples[serie], indexedTuples[serie][0]]))
        .each(function(group) {
            addTooltip(() => {
                const dimensionIndex = Math.round(offsetToDimension(d3.event.offsetX - margin.left))
                const dimensionMember = dimension.members[dimensionIndex]
                return `${group}, ${dimensionMember}: ${nestedData[dimensionMember][group]}`
            }, d3.select(this))
        })

    selectOrAppend(radialchart, 'g.radial-axis')
        .attr('transform', `translate(0, ${-chartRadius})`)
        .call(radialAxis)
        .classed('only-labels', true)
        .selectAll('.tick')
        .each(function(tick) {
            const radius = radial(tick)
            const tickG = d3.select(this)
            tickG.selectAll('text').style('visibility', 'hidden')
            selectOrAppend(tickG, 'circle')
                .classed('grid', true)
                .attr('cy', chartRadius - radius)
                .attr('r', radius)
        })

    const circularTicks = selectOrAppend(radialchart, 'g.circular-axis')
        .selectAll('g.tick')
        .data(dimension.members)

    circularTicks.exit().remove();
    circularTicks.enter()
        .append('g')
        .classed('tick', true)
        .merge(circularTicks)
        .each(function(tick, index) {
            const angle = circular(index) * 180 / Math.PI
            selectOrAppend(d3.select(this), 'text')
                .text(tick)
                .attr('transform', `rotate(${angle}), translate(0, ${-chartRadius})`)
        })
}
