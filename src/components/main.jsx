import React from 'react'
import Sidebar from './sidebar.jsx'
import Dashboard from './dashboard.jsx'
require('../styles/main.css')

const Main = () => (<div id="main">
		<Sidebar />
		<Dashboard />
	</div>)

export default Main