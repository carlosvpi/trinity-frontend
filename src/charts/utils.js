import * as d3 from 'd3'
import { curry } from 'ramda'

export function selectOrAppend(selection, toSelectOrAppend) {
    const selected = selection.select(toSelectOrAppend)

    if (selected.size()) {
        return selected;
    } else {
        let classes = toSelectOrAppend.split('.')
        const tag = classes[0]

        classes = classes.slice(1)
        return classes.reduce((selectedElement, className) => selectedElement.classed(className, true), selection.append(tag))
    }
}

export const addTooltip = curry((value, target) => {
    let tooltip = null

    target.on('mouseover', () => {
            tooltip = d3.select('body')
                .append('div')
                .classed('tooltip', true)
        })
        .on('mousemove', (d, i, a) => {
            const pageX = d3.event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft + 12
            const pageY = d3.event.clientY + document.body.scrollTop + document.documentElement.scrollTop + 12

            tooltip.html(typeof(value) === 'function' ? value(d, i, a) : value)
                .style('top', pageY + 'px')
                .style('left', pageX + 'px')
        })
        .on('mouseout', () => tooltip.remove())
})

export const publicationPalette = ['#42f495', '#2fd87e', '#22c16d', '#19a85c', '#0f8446', '#096634', '#09542b', '#2b704a', '#3f825d', '#5cb584']
