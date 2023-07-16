import React, { useState } from 'react';

const App = () => {
	const [ todoValue, setTodoValue ] = useState('');
	const [ todos, setTodos ] = useState([]);
	const inputChangeHandler = (event) => {
		setTodoValue(event.target.value);
	};
	const buttonClickHandler = () => {
		setTodos((prevState) => {
			// let newArr = [];
			// for (let todo of prevState) {
			// 	newArr.push(todo);
			// }
			// newArr.push(todoValue);
			// return newArr;
			return [ ...prevState, todoValue ];
		});
	};
	return (
		<React.Fragment>
			<input value={todoValue} onChange={inputChangeHandler} />
			<button onClick={buttonClickHandler}>add</button>
			<ul>
				{todos.map((ele, idx) => {
					return <li>{ele}</li>;
				})}
			</ul>
		</React.Fragment>
	);
};

export default App;
