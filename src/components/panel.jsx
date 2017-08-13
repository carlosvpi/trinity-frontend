import React from 'react'
import charts from '../charts'
require('../styles/panel.css')
require('../styles/chart.css')

class Panel extends React.Component {
	update({ id, chart, data, options }) {
		if (charts[chart]) {
			charts[chart](document.getElementById(id), data, options)
		} else {				
			console.log(`Chart '${chart}' does not exist`)
		}
	}
	componentDidUpdate(props, prevState) {
		this.update(props)
	}
	componentDidMount() {
		this.update(this.props)
		window.addEventListener('resize', () => this.update(this.props));
	}
	render () {
		const { id, chart, className, title } = this.props
		return <div className={`panel ${className}`} id={ id }>
			<h3>{ title || '' }</h3>
		</div>
	}
}

export default Panel