import React from 'react'
require('../styles/value-panel.css')

const ValuePanel = ({ content }) => {
	return <div className='value-panel'>
		<h2>{ content }</h2>
		<strong className='total-value'>1000</strong>
		<p>Unique <span>100</span></p>
	</div>
}

export default ValuePanel