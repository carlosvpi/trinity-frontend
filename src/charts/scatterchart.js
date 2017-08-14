import * as d3 from 'd3'
import { indexBy, prop } from 'ramda'
import { selectOrAppend, addTooltip, publicationPalette } from './utils'

export default (div, { dimensions, tuples }, { dimensionKey, verticalAxis, horizontalAxis }) => {
    // Data
    const dimension = dimensions[dimensionKey]
    const indexedTuples = indexBy(prop(dimension.id), tuples)

    // SVG Node
    const svg = selectOrAppend(d3.select(div), 'svg')

    // Presentation
    const { clientWidth, clientHeight } = svg.node()
    const margin = {
        top: 20,
        right: 28,
        bottom: 28,
        left: 20
    }
    const chartWidth = clientWidth - margin.left - margin.right
    const chartHeight = clientHeight - margin.top - margin.bottom

    // Scale
    const xDomain = d3.extent(tuples, prop(horizontalAxis))
    const yDomain = d3.extent(tuples, prop(verticalAxis))
    let x = d3.scaleLinear()
        .domain(xDomain)
        .range([0, chartWidth])
    let y = d3.scaleLinear()
        .domain(yDomain)
        .range([chartHeight, 0])

    // Nodes
    const scatterchart = selectOrAppend(svg, 'g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const chart = selectOrAppend(scatterchart, 'g.chart')

    function draw() {
        const xScale = d3.event ? d3.event.transform.rescaleX(x) : x
        const yScale = d3.event ? d3.event.transform.rescaleY(y) : y
        // Axes
        const xAxisTop = d3.axisTop(xScale)
        const xAxisBottom = d3.axisBottom(xScale)
        const yAxisLeft = d3.axisLeft(yScale)
        const yAxisRight = d3.axisRight(yScale)

        selectOrAppend(scatterchart, 'g.y-axis-grid').call(yAxisLeft).selectAll('line').classed('grid', true).classed('autostyle', true).attr('x2', chartWidth)
        selectOrAppend(scatterchart, 'g.y-axis-left').call(yAxisLeft)
        selectOrAppend(scatterchart, 'g.y-axis-right').call(yAxisRight).attr('transform', `translate(${chartWidth})`)
        selectOrAppend(scatterchart, 'g.x-axis-grid').call(xAxisTop).selectAll('line').classed('grid', true).classed('autostyle', true).attr('y2', chartHeight)
        selectOrAppend(scatterchart, 'g.x-axis-top').call(xAxisTop)
        selectOrAppend(scatterchart, 'g.x-axis-bottom').call(xAxisBottom).attr('transform', `translate(0, ${chartHeight})`)

        // Position dots
        chart.selectAll('.segment')
            .each(function(d) {
                const xPos = xScale(indexedTuples[d][horizontalAxis])
                const yPos = yScale(indexedTuples[d][verticalAxis])
                d3.select(this)
                    .attr('cx', xPos)
                    .attr('cy', yPos)
                    .style('visibility', (xPos < 0 || xPos > chartWidth || yPos < 0 || yPos > chartHeight)
                        ? 'hidden'
                        : 'visible')
            })
    }

    // Zoom
    const zoom = d3.zoom()
        .scaleExtent([1, 10])
        .translateExtent([[0, 0], [clientWidth, clientHeight]])
        .on('zoom', draw)

    svg.call(zoom)

    const dots = chart.selectAll('circle.segment')
        .data(dimension.members)

    dots.exit().remove()
    dots.enter()
        .append('circle')
        .attr('class', d => `segment ${dimensionKey}-${d}`)
        .style('fill', group => publicationPalette[group])
        .attr('r', 3)
        .merge(dots)
        .each(function(d) {
            addTooltip(`${d}: <br />${indexedTuples[d][verticalAxis].toFixed(1)}, ${indexedTuples[d][horizontalAxis].toFixed(1)}`, d3.select(this))
        })

    draw()
}
