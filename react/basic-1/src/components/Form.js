import React, { useState } from 'react';
const Form = (props) => {
	const [ variableName, setState ] = useState('');

	const inputClickHandler = (event) => {
		event.preventDefault();
		console.log(variableName);
		props.greetFunction('john');
	};
	const inputChangeHandler = (event) => {
		setState(event.target.value);
		console.log(variableName);
		// inputValue = event.target.value
	};
	return (
		<React.Fragment>
			<form method={props.method} action={props.action}>
				<input type={props.inputType} onChange={inputChangeHandler} />
				<button onClick={inputClickHandler} type="submit">
					Submit
				</button>
			</form>
		</React.Fragment>
	);
};
// class Form extends React.Component {
// 	state = {
// 		inputValue: ''
// 	};
// 	inputClickHandler = (event) => {
// 		event.preventDefault();
// 		console.log(this.state.inputValue);
// 	};
// 	inputChangeHandler = (event) => {
// 		// this.setState({
// 		// 	inputValue: event.target.value
// 		// });
// 		this.state.inputValue = event.target.value;
// 		console.log(this.state.inputValue);
// 	};
// 	render() {
// 		return (
// 			<React.Fragment>
// 				<form method={this.props.method} action={this.props.action}>
// 					<input type={this.props.inputType} onChange={this.inputChangeHandler} />
// 					<button onClick={this.inputClickHandler} type="submit">
// 						Submit
// 					</button>
// 				</form>
// 			</React.Fragment>
// 		);
// 	}
// }

export default Form;
