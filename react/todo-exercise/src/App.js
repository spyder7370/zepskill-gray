import React, { useState } from 'react';
import Li from './components/Li';

const App = () => {
	const [ inputValue, setInputValue ] = useState('');
	const [ list, setList ] = useState([]);

	const addTodoToList = () => {
		// ! let newArr = list; shallow copy
		let newArr = [];
		for (let item of list) {
			newArr.push(item);
		}
		newArr.push(inputValue);
		setList(newArr);
		setInputValue('');
		// setList([ ...list, inputValue ]);
	};
	const updateInputValue = (event) => {
		setInputValue(event.target.value);
	};
	const deleteTodo = (idx) => {
		// const li = event.target;
		// li.parentNode.removeChild(li);
		// list.splice(idx, 1);
		// setList([ ...list ]);
		// let newArr = [];
		// for (let i in list) {
		// 	if(idx !== i) newArr.push(list[i]);
		// }
		// setList(newArr);
		let newArr = list.filter((item, i) => {
			return idx !== i;
		});
		setList(newArr);
	};

	return (
		<div className="container">
			<div className="heading">
				<h1>ToDo Application</h1>
			</div>
			<div className="form">
				<input value={inputValue} onChange={updateInputValue} />
				<button onClick={addTodoToList}>add</button>
			</div>
			<div>
				<ul>
					{list.map((item, idx) => {
						return <Li deleteFunction={deleteTodo} key={idx} message={item} index={idx} />;
					})}
				</ul>
			</div>
		</div>
	);
};

export default App;
