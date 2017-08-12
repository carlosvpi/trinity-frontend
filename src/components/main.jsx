import React from 'react'
import Sidebar from './sidebar.jsx'
import Dashboard from './dashboard.jsx'
import * as d3 from 'd3'
require('../styles/main.css')

class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		d3.json('https://jsonplaceholder.typicode.com/posts/1', (err, data) => {
			if (err) {
				console.log(err)
			} else {
				this.setState({ data })
			}
		})		
	}
	render() {
		const { data } = this.state
		return <div id="main">
			<Sidebar groupBy='Nothing' aggregateBy='Day' uniqueness='Total' />
			{
				data
				? <Dashboard data={ data } />
				: <h2>Connecting to the server</h2>
			}
		</div>
	}
}

export default Main