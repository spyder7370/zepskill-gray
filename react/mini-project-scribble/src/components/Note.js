import React, { useState } from 'react';

const Note = (props) => {
	const [ isExpanded, setExpaned ] = useState(false);
	const expandParagraph = () => {
		setExpaned(!isExpanded);
	};
	return (
		<React.Fragment>
			<h1 onClick={expandParagraph}>{props.title}</h1>
			{isExpanded ? <p>{props.content}</p> : null}
		</React.Fragment>
	);
};

export default Note;
