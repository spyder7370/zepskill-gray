import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const ShowNews = () => {
	return (
		<React.Fragment>
			<div className="article_container">
				<h1>Title</h1>
				{/* <img src="https://picsum.photos/1920/1080" /> */}
				<div style={{ backgroundImage: 'url(https://picsum.photos/1920/1080)' }} className="image" />
				<div className="author">
					<span>created by: Admin</span>
					<div>created at: 9:54 PM</div>
				</div>
				<div className="my-3 content">
					a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
					words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical
					literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
					of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This
					book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of
					Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard
					chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32
					and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
					original form, accompanied by English versions from the 1914 translation by H. Rackham.
				</div>
				<LinkContainer to={'/news/id/edit'}>
					<button className="btn btn-warning mb-3">Edit</button>
				</LinkContainer>
				<button className="ms-2 btn btn-danger mb-3">Delete</button>
			</div>
		</React.Fragment>
	);
};

export default ShowNews;
