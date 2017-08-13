import React from 'react'
import Sidebar from './sidebar.jsx'
import Dashboard from './dashboard.jsx'
// import mockServer from '../utils/mock-server.js'
import * as d3 from 'd3'
require('../styles/main.css')

class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			connecting: 0,
			data: {
				totalVisits: 14971,
				uniqueVisits: 12581,
				todayVisits: 317,
				todayUniqueVisits: 291,
				streamData: {"dimensions":{"days":{"id":"day","members":[1,2,3,4,5,6,7]},"publications":{"id":"publication","members":[0,1,2,3,4,5,6,7,8,9]}},"tuples":[{"day":1,"publication":0,"totalVisits":26,"uniqueVisits":21},{"day":1,"publication":1,"totalVisits":18,"uniqueVisits":4},{"day":1,"publication":2,"totalVisits":22,"uniqueVisits":3},{"day":1,"publication":3,"totalVisits":55,"uniqueVisits":24},{"day":1,"publication":4,"totalVisits":91,"uniqueVisits":38},{"day":1,"publication":5,"totalVisits":26,"uniqueVisits":13},{"day":1,"publication":6,"totalVisits":4,"uniqueVisits":3},{"day":1,"publication":7,"totalVisits":14,"uniqueVisits":13},{"day":1,"publication":8,"totalVisits":77,"uniqueVisits":18},{"day":1,"publication":9,"totalVisits":30,"uniqueVisits":19},{"day":2,"publication":0,"totalVisits":52,"uniqueVisits":31},{"day":2,"publication":1,"totalVisits":5,"uniqueVisits":1},{"day":2,"publication":2,"totalVisits":75,"uniqueVisits":33},{"day":2,"publication":3,"totalVisits":33,"uniqueVisits":21},{"day":2,"publication":4,"totalVisits":60,"uniqueVisits":32},{"day":2,"publication":5,"totalVisits":1,"uniqueVisits":1},{"day":2,"publication":6,"totalVisits":91,"uniqueVisits":8},{"day":2,"publication":7,"totalVisits":69,"uniqueVisits":53},{"day":2,"publication":8,"totalVisits":91,"uniqueVisits":66},{"day":2,"publication":9,"totalVisits":10,"uniqueVisits":6},{"day":3,"publication":0,"totalVisits":9,"uniqueVisits":5},{"day":3,"publication":1,"totalVisits":57,"uniqueVisits":16},{"day":3,"publication":2,"totalVisits":82,"uniqueVisits":11},{"day":3,"publication":3,"totalVisits":50,"uniqueVisits":2},{"day":3,"publication":4,"totalVisits":40,"uniqueVisits":21},{"day":3,"publication":5,"totalVisits":8,"uniqueVisits":7},{"day":3,"publication":6,"totalVisits":10,"uniqueVisits":4},{"day":3,"publication":7,"totalVisits":37,"uniqueVisits":21},{"day":3,"publication":8,"totalVisits":51,"uniqueVisits":37},{"day":3,"publication":9,"totalVisits":45,"uniqueVisits":19},{"day":4,"publication":0,"totalVisits":86,"uniqueVisits":54},{"day":4,"publication":1,"totalVisits":96,"uniqueVisits":39},{"day":4,"publication":2,"totalVisits":39,"uniqueVisits":35},{"day":4,"publication":3,"totalVisits":98,"uniqueVisits":38},{"day":4,"publication":4,"totalVisits":59,"uniqueVisits":17},{"day":4,"publication":5,"totalVisits":16,"uniqueVisits":14},{"day":4,"publication":6,"totalVisits":75,"uniqueVisits":4},{"day":4,"publication":7,"totalVisits":44,"uniqueVisits":6},{"day":4,"publication":8,"totalVisits":70,"uniqueVisits":7},{"day":4,"publication":9,"totalVisits":68,"uniqueVisits":51},{"day":5,"publication":0,"totalVisits":93,"uniqueVisits":62},{"day":5,"publication":1,"totalVisits":53,"uniqueVisits":33},{"day":5,"publication":2,"totalVisits":75,"uniqueVisits":32},{"day":5,"publication":3,"totalVisits":50,"uniqueVisits":49},{"day":5,"publication":4,"totalVisits":80,"uniqueVisits":29},{"day":5,"publication":5,"totalVisits":20,"uniqueVisits":7},{"day":5,"publication":6,"totalVisits":69,"uniqueVisits":46},{"day":5,"publication":7,"totalVisits":19,"uniqueVisits":15},{"day":5,"publication":8,"totalVisits":36,"uniqueVisits":35},{"day":5,"publication":9,"totalVisits":82,"uniqueVisits":51},{"day":6,"publication":0,"totalVisits":10,"uniqueVisits":3},{"day":6,"publication":1,"totalVisits":92,"uniqueVisits":13},{"day":6,"publication":2,"totalVisits":14,"uniqueVisits":5},{"day":6,"publication":3,"totalVisits":59,"uniqueVisits":5},{"day":6,"publication":4,"totalVisits":4,"uniqueVisits":3},{"day":6,"publication":5,"totalVisits":56,"uniqueVisits":20},{"day":6,"publication":6,"totalVisits":35,"uniqueVisits":8},{"day":6,"publication":7,"totalVisits":9,"uniqueVisits":3},{"day":6,"publication":8,"totalVisits":27,"uniqueVisits":6},{"day":6,"publication":9,"totalVisits":31,"uniqueVisits":18},{"day":7,"publication":0,"totalVisits":2,"uniqueVisits":0},{"day":7,"publication":1,"totalVisits":26,"uniqueVisits":16},{"day":7,"publication":2,"totalVisits":93,"uniqueVisits":72},{"day":7,"publication":3,"totalVisits":85,"uniqueVisits":3},{"day":7,"publication":4,"totalVisits":54,"uniqueVisits":22},{"day":7,"publication":5,"totalVisits":34,"uniqueVisits":21},{"day":7,"publication":6,"totalVisits":37,"uniqueVisits":14},{"day":7,"publication":7,"totalVisits":2,"uniqueVisits":2},{"day":7,"publication":8,"totalVisits":9,"uniqueVisits":9},{"day":7,"publication":9,"totalVisits":84,"uniqueVisits":64}]},
				topPublications: {"dimensions":{"publications":{"id":"publication","members":[0,1,2,3,4,5,6,7,8,9]}},"tuples":[{"publication":0,"totalVisits":64,"uniqueVisits":53},{"publication":1,"totalVisits":2,"uniqueVisits":2},{"publication":2,"totalVisits":76,"uniqueVisits":1},{"publication":3,"totalVisits":58,"uniqueVisits":55},{"publication":4,"totalVisits":5,"uniqueVisits":3},{"publication":5,"totalVisits":41,"uniqueVisits":15},{"publication":6,"totalVisits":9,"uniqueVisits":4},{"publication":7,"totalVisits":27,"uniqueVisits":26},{"publication":8,"totalVisits":36,"uniqueVisits":13},{"publication":9,"totalVisits":68,"uniqueVisits":42}]},
				scatterData: {"dimensions":{"publications":{"id":"publication","members":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]}},"tuples":[{"publication":0,"articles":56.356125259059134,"visits":41.52855901716349},{"publication":1,"articles":3.6300659303754608,"visits":5.529189996761561},{"publication":2,"articles":74.65124489559973,"visits":76.41934543834424},{"publication":3,"articles":21.40513528816402,"visits":22.834595216252506},{"publication":4,"articles":62.015649039047574,"visits":75.652036770477},{"publication":5,"articles":55.39976321551503,"visits":54.19049773991167},{"publication":6,"articles":71.47491419173402,"visits":71.9924917086849},{"publication":7,"articles":70.79521064938695,"visits":72.28469669220094},{"publication":8,"articles":24.870397986896222,"visits":19.53628527431063},{"publication":9,"articles":18.598401451835244,"visits":26.75344780841214},{"publication":10,"articles":52.000247360323456,"visits":40.71300740563889},{"publication":11,"articles":40.248196867699946,"visits":34.57441542168652},{"publication":12,"articles":4.410387467727807,"visits":-2.4278061563681215},{"publication":13,"articles":16.049248662790717,"visits":16.67882257243211},{"publication":14,"articles":3.2674908376516205,"visits":4.337149338234233},{"publication":15,"articles":12.920647699189082,"visits":24.468611796621982},{"publication":16,"articles":20.328475034404327,"visits":14.074444800980126},{"publication":17,"articles":83.02342110946525,"visits":81.82291943695145},{"publication":18,"articles":97.27742358770793,"visits":96.58059610621196},{"publication":19,"articles":90.95084326574239,"visits":88.40382918907424}]}
			}
		}
		this.state.data.radialData = this.state.data.streamData
		this.loadData('nothing', 'nothing', 'nothing', ['totalVisits'])
		this.loadData('uniq', 'nothing', 'nothing', ['uniqueVisits'])
		// this.loadData('nothing', 'day', 'nothing', ['todayVisits'])
		// this.loadData('uniq', 'day', 'nothing', ['todayUniqueVisits'])
		this.loadData('nothing', 'day', 'publicationId', ['streamData', 'radialData'])
		this.loadData('nothing', 'nothing', 'publicationId', ['topPublications'])
	}
	loadData(uniq, period, group, keys) {
		this.state.connecting++
		this.setState({ connecting: this.state.connecting })
		d3.json(`http://localhost:4567/get?uniq=${uniq}&period=${period}&group=${group}`, (err, data) => {
			if (err) {
				console.error(err)
				// Mock server
				// data = mockServer(uniq, period, group)
			} else {
				keys.forEach(key => this.state.data[key] = data)
				this.setState({
					...this.state,
					connecting: this.state.connecting--
				})
			}
		})		
	}
	render() {
		const { data, connecting } = this.state
		return <div id="main">
			<Sidebar groupBy='Nothing' aggregateBy='Day' uniqueness='Total' connecting={ connecting }/>
			{
				data
				? <Dashboard data={ data } />
				: <h2>Connecting to the server</h2>
			}
		</div>
	}
}

export default Main