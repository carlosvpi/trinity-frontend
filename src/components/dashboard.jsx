import React from 'react'
import ValuePanel from './value-panel.jsx'
import Panel from './panel.jsx'
require('../styles/dashboard.css')

const Dashboard = ({ data }) => {
	const {
		totalVisits,
		uniqueVisits,
		todayVisits,
		todayUniqueVisits,
		streamData,
		topPublications,
		scatterData } = data
	return <div id="dashboard">
		<div id="top-row">
			<ValuePanel title="Total Visits" data={ totalVisits }/>
			<ValuePanel title="Today's Visits" data={ todayVisits }/>
			<ValuePanel title="Unique Visits" data={ uniqueVisits }/>
			<ValuePanel title="Today's Unique Visits" data={ todayUniqueVisits }/>
		</div>
		<Panel title="Publications by time" id="streamgraph" chart="streamgraph" className="col3" data={ streamData } options={{ dimensionKey: 'days', seriesKey: 'publications', propName: 'totalVisits' }} />
		<Panel title="Top publications" id="vbarchart" chart="verticalBarchart" className="row2" data={ topPublications } options={{ dimensionKey: 'publications', propName: 'totalVisits' }} />
		<Panel title="Visits vs. articles" id="scatterchart" chart="scatterchart" data={ scatterData } options={{ dimensionKey: 'publications', verticalAxis: 'articles', horizontalAxis: 'visits' }} />
		<Panel id="piechart" />
		<Panel title="Publications by time" id="radialchart" chart="radialchart" data={ streamData } options={{ dimensionKey: 'days', seriesKey: 'publications', propName: 'totalVisits' }} />
	</div>
}

export default Dashboard