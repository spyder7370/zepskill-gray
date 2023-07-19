import React, { useEffect, useState } from 'react';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import List from './components/List';

const App = () => {
	const [ list, setList ] = useState(localStorage.list ? JSON.parse(localStorage.list) : []);

	useEffect(
		() => {
			localStorage.list = JSON.stringify(list);
		},
		[ list ]
	);

	const addNoteToList = (note) => {
		setList([ ...list, note ]);
	};
	const deleteNoteFromList = (index) => {
		const newArr = list.filter((item, idx) => index !== idx);
		setList(newArr);
	};

	return (
		<React.Fragment>
			<Header />
			<Form addNoteToList={addNoteToList} />
			<List list={list} deleteNoteFromList={deleteNoteFromList} />
			<Footer />
		</React.Fragment>
	);
};

export default App;
