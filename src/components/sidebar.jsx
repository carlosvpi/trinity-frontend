import React from 'react'
require('../styles/sidebar.css')

const Sidebar = ({ groupBy, aggregateBy, uniqueness }) => (<div id="sidebar">
		<div id="group-by">
			<h2>Group by</h2>
			<ul>
				<li><a href="#" className={ groupBy === 'Nothing' ? 'selected' : '' }>Nothing</a></li>
				<li><a href="#" className={ groupBy === 'Publication' ? 'selected' : '' }>Publication</a></li>
				<li><a href="#" className={ groupBy === 'Channel' ? 'selected' : '' }>Channel</a></li>
				<li><a href="#" className={ groupBy === 'Platform' ? 'selected' : '' }>Platform</a></li>
			</ul>
			<div id="group-items"></div>
		</div>
		<div id="time">
			<h2>Aggregate by</h2>
			<ul>
				<li><a href="#" className={ aggregateBy === 'Day' ? 'selected' : '' }>Day</a></li>
				<li><a href="#" className={ aggregateBy === 'Hour' ? 'selected' : '' }>Hour</a></li>
				<li><a href="#" className={ aggregateBy === 'DayHour' ? 'selected' : '' }>Day and hour</a></li>
			</ul>
		</div>
		<div id="uniqueness">
			<h2>Total or unique visits</h2>
			<ul>
				<li><a href="#" className={ uniqueness === 'Total' ? 'selected' : '' }>Total</a></li>
				<li><a href="#" className={ uniqueness === 'Unique' ? 'selected' : '' }>Unique</a></li>
			</ul>
		</div>
	</div>)

export default Sidebar