import React, { useState } from 'react';

const App = () => {
	const [ currTime, setCurrTime ] = useState(new Date().toLocaleTimeString());
	const updateTime = () => {
		setCurrTime(new Date().toLocaleTimeString());
	};
	setInterval(updateTime, 1000);
	return (
		<React.Fragment>
			<h1>{currTime}</h1>
			<button onClick={updateTime}>Update Time</button>
		</React.Fragment>
	);
};

export default App;
