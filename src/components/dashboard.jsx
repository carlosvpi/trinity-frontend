import React from 'react'
import ValuePanel from './value-panel.jsx'
import Panel from './panel.jsx'
require('../styles/dashboard.css')

const streamgraphData = {"dimensions":{"days":{"id":"day","members":[1,2,3,4,5,6,7]},"publications":{"id":"publication","members":[0,1,2,3,4,5,6,7,8,9]}},"tuples":[{"day":1,"publication":0,"totalVisits":26,"uniqueVisits":21},{"day":1,"publication":1,"totalVisits":18,"uniqueVisits":4},{"day":1,"publication":2,"totalVisits":22,"uniqueVisits":3},{"day":1,"publication":3,"totalVisits":55,"uniqueVisits":24},{"day":1,"publication":4,"totalVisits":91,"uniqueVisits":38},{"day":1,"publication":5,"totalVisits":26,"uniqueVisits":13},{"day":1,"publication":6,"totalVisits":4,"uniqueVisits":3},{"day":1,"publication":7,"totalVisits":14,"uniqueVisits":13},{"day":1,"publication":8,"totalVisits":77,"uniqueVisits":18},{"day":1,"publication":9,"totalVisits":30,"uniqueVisits":19},{"day":2,"publication":0,"totalVisits":52,"uniqueVisits":31},{"day":2,"publication":1,"totalVisits":5,"uniqueVisits":1},{"day":2,"publication":2,"totalVisits":75,"uniqueVisits":33},{"day":2,"publication":3,"totalVisits":33,"uniqueVisits":21},{"day":2,"publication":4,"totalVisits":60,"uniqueVisits":32},{"day":2,"publication":5,"totalVisits":1,"uniqueVisits":1},{"day":2,"publication":6,"totalVisits":91,"uniqueVisits":8},{"day":2,"publication":7,"totalVisits":69,"uniqueVisits":53},{"day":2,"publication":8,"totalVisits":91,"uniqueVisits":66},{"day":2,"publication":9,"totalVisits":10,"uniqueVisits":6},{"day":3,"publication":0,"totalVisits":9,"uniqueVisits":5},{"day":3,"publication":1,"totalVisits":57,"uniqueVisits":16},{"day":3,"publication":2,"totalVisits":82,"uniqueVisits":11},{"day":3,"publication":3,"totalVisits":50,"uniqueVisits":2},{"day":3,"publication":4,"totalVisits":40,"uniqueVisits":21},{"day":3,"publication":5,"totalVisits":8,"uniqueVisits":7},{"day":3,"publication":6,"totalVisits":10,"uniqueVisits":4},{"day":3,"publication":7,"totalVisits":37,"uniqueVisits":21},{"day":3,"publication":8,"totalVisits":51,"uniqueVisits":37},{"day":3,"publication":9,"totalVisits":45,"uniqueVisits":19},{"day":4,"publication":0,"totalVisits":86,"uniqueVisits":54},{"day":4,"publication":1,"totalVisits":96,"uniqueVisits":39},{"day":4,"publication":2,"totalVisits":39,"uniqueVisits":35},{"day":4,"publication":3,"totalVisits":98,"uniqueVisits":38},{"day":4,"publication":4,"totalVisits":59,"uniqueVisits":17},{"day":4,"publication":5,"totalVisits":16,"uniqueVisits":14},{"day":4,"publication":6,"totalVisits":75,"uniqueVisits":4},{"day":4,"publication":7,"totalVisits":44,"uniqueVisits":6},{"day":4,"publication":8,"totalVisits":70,"uniqueVisits":7},{"day":4,"publication":9,"totalVisits":68,"uniqueVisits":51},{"day":5,"publication":0,"totalVisits":93,"uniqueVisits":62},{"day":5,"publication":1,"totalVisits":53,"uniqueVisits":33},{"day":5,"publication":2,"totalVisits":75,"uniqueVisits":32},{"day":5,"publication":3,"totalVisits":50,"uniqueVisits":49},{"day":5,"publication":4,"totalVisits":80,"uniqueVisits":29},{"day":5,"publication":5,"totalVisits":20,"uniqueVisits":7},{"day":5,"publication":6,"totalVisits":69,"uniqueVisits":46},{"day":5,"publication":7,"totalVisits":19,"uniqueVisits":15},{"day":5,"publication":8,"totalVisits":36,"uniqueVisits":35},{"day":5,"publication":9,"totalVisits":82,"uniqueVisits":51},{"day":6,"publication":0,"totalVisits":10,"uniqueVisits":3},{"day":6,"publication":1,"totalVisits":92,"uniqueVisits":13},{"day":6,"publication":2,"totalVisits":14,"uniqueVisits":5},{"day":6,"publication":3,"totalVisits":59,"uniqueVisits":5},{"day":6,"publication":4,"totalVisits":4,"uniqueVisits":3},{"day":6,"publication":5,"totalVisits":56,"uniqueVisits":20},{"day":6,"publication":6,"totalVisits":35,"uniqueVisits":8},{"day":6,"publication":7,"totalVisits":9,"uniqueVisits":3},{"day":6,"publication":8,"totalVisits":27,"uniqueVisits":6},{"day":6,"publication":9,"totalVisits":31,"uniqueVisits":18},{"day":7,"publication":0,"totalVisits":2,"uniqueVisits":0},{"day":7,"publication":1,"totalVisits":26,"uniqueVisits":16},{"day":7,"publication":2,"totalVisits":93,"uniqueVisits":72},{"day":7,"publication":3,"totalVisits":85,"uniqueVisits":3},{"day":7,"publication":4,"totalVisits":54,"uniqueVisits":22},{"day":7,"publication":5,"totalVisits":34,"uniqueVisits":21},{"day":7,"publication":6,"totalVisits":37,"uniqueVisits":14},{"day":7,"publication":7,"totalVisits":2,"uniqueVisits":2},{"day":7,"publication":8,"totalVisits":9,"uniqueVisits":9},{"day":7,"publication":9,"totalVisits":84,"uniqueVisits":64}]}
const verticalBarchartData = {"dimensions":{"publications":{"id":"publication","members":[0,1,2,3,4,5,6,7,8,9]}},"tuples":[{"publication":0,"totalVisits":64,"uniqueVisits":53},{"publication":1,"totalVisits":2,"uniqueVisits":2},{"publication":2,"totalVisits":76,"uniqueVisits":1},{"publication":3,"totalVisits":58,"uniqueVisits":55},{"publication":4,"totalVisits":5,"uniqueVisits":3},{"publication":5,"totalVisits":41,"uniqueVisits":15},{"publication":6,"totalVisits":9,"uniqueVisits":4},{"publication":7,"totalVisits":27,"uniqueVisits":26},{"publication":8,"totalVisits":36,"uniqueVisits":13},{"publication":9,"totalVisits":68,"uniqueVisits":42}]}


const Dashboard = ({ data }) => {
	const {
		totalVisits,
		uniqueVisits,
		todayVisits,
		todayUniqueVisits,
		streamData,
		topPublications } = data
	return <div id="dashboard">
		<div id="top-row">
			<ValuePanel title="Total Visits" data={ totalVisits }/>
			<ValuePanel title="Today's Visits" data={ todayVisits }/>
			<ValuePanel title="Unique Visits" data={ uniqueVisits }/>
			<ValuePanel title="Today's Unique Visits" data={ todayUniqueVisits }/>
		</div>
		<Panel title="Publications by time" id="streamgraph" chart="streamgraph" className="col3" data={ streamData } options={{ dimensionKey: 'days', seriesKey: 'publications', propName: 'totalVisits' }} />
		<Panel title="Top publications" id="vbarchart" chart="verticalBarchart" className="row2" data={ topPublications } options={{ dimensionKey: 'publications', propName: 'totalVisits' }} />
		<Panel id="hbarchart" />
		<Panel id="piechart" />
		<Panel title="Publications by time" id="radialchart" chart="radialchart" data={ streamData } options={{ dimensionKey: 'days', seriesKey: 'publications', propName: 'totalVisits' }} />
	</div>
}

export default Dashboard