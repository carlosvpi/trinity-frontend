import React from 'react'
require('../styles/value-panel.css')

const ValuePanel = ({ title, data }) => {
	return <div className='value-panel'>
		<h2>{ title }</h2>
		<strong>{ data }</strong>
	</div>
}

export default ValuePanel