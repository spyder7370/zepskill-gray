import React, { useState } from 'react';
import Form from './Form';
// const React = require('react')
// import '../stylesheets/style.css';

// ! functional component
const App = () => {
	// const styles = {
	// 	color: 'blue',
	// 	backgroundColor: 'gray'
	// };

	const [ count, setCount ] = useState(0);

	const h1ClickHandler = () => {
		alert('clicked');
	};
	function greet(name) {
		alert(`hello ${name}`);
	}
	const buttonClickHandler = () => {
		setCount(count + 1);
	};
	const minusOne = () => {
		setCount(count - 1);
	};
	const resetCount = () => {
		setCount(0);
	};
	return (
		<React.Fragment>
			<h1 style={{ color: 'red' }} onClick={h1ClickHandler}>
				hello
			</h1>
			<p>world</p>
			<h1>You clicked the button {count} times</h1>
			<button onClick={buttonClickHandler}>+1</button>
			<button onClick={minusOne}>-1</button>
			<button onClick={resetCount}>Reset</button>
		</React.Fragment>
	);
};
// {} -> <% %>
// ! class based component
// class App extends React.Component {
// 	render() {
// 		return (
// 			<React.Fragment>
// 				<h1>hello</h1>
// 				<p>abcd</p>
// 			</React.Fragment>
// 		);
// 	}
// }
export default App;
// module.exports = App;
