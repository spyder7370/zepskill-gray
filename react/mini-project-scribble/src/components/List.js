import React from 'react';

import Note from './Note';
import DeleteIcon from '@mui/icons-material/Delete';

const List = (props) => {
	const deleteNoteFromList = (idx) => {
		props.deleteNoteFromList(idx);
	};

	return (
		<React.Fragment>
			{props.list.map((item, idx) => {
				return (
					<div key={idx} className="note">
						<Note title={item.title} content={item.content} />
						<button
							onClick={() => {
								deleteNoteFromList(idx);
							}}
						>
							<DeleteIcon />
						</button>
					</div>
				);
			})}
		</React.Fragment>
	);
};

export default List;
