import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

const Form = (props) => {
	const [ isExpanded, setExpanded ] = useState(false);
	const [ noteDetails, setNoteDetails ] = useState({
		title: '',
		content: ''
	});

	const changeNoteDetails = (event) => {
		const { className, value } = event.target;
		setNoteDetails({
			...noteDetails,
			[className]: value
		});
	};
	const addNote = (event) => {
		event.preventDefault();
		if (noteDetails.title.length && noteDetails.content.length) {
			props.addNoteToList(noteDetails);
			setNoteDetails({
				title: '',
				content: ''
			});
			setExpanded(false);
		}
	};
	const expandArea = () => {
		setExpanded(true);
	};
	const shrinkArea = () => {
		if (!noteDetails.title.length) setExpanded(false);
	};

	return (
		<React.Fragment>
			<form className="create-note">
				<input
					onFocus={expandArea}
					onBlur={shrinkArea}
					value={noteDetails.title}
					className="title"
					onChange={changeNoteDetails}
					placeholder="title"
				/>
				{isExpanded ? (
					<textarea
						value={noteDetails.content}
						className="content"
						onChange={changeNoteDetails}
						placeholder="content"
					/>
				) : null}
				<Fab onClick={addNote}>
					<AddIcon />
				</Fab>
			</form>
		</React.Fragment>
	);
};

export default Form;
