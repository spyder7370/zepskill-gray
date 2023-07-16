import React from 'react';

const Li = (props) => {
	console.log(props);
	const strikeThroughTodo = (event) => {
		event.target.classList.toggle('strikethrough');
	};
	const doubleClickHandler = () => {
		let idx = props.index;
		props.deleteFunction(idx);
	};

	return (
		<React.Fragment>
			<li onDoubleClick={doubleClickHandler} onClick={strikeThroughTodo}>
				{props.message}
			</li>
		</React.Fragment>
	);
};

export default Li;
