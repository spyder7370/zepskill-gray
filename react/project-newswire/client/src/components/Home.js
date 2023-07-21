import React from 'react';
import Masonry from 'react-masonry-css';

import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

const Home = () => {
	const breakpointColumnsObj = {
		default: 3,
		750: 2,
		500: 1
	};
	return (
		<React.Fragment>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				<div>
					<img src="https://picsum.photos/1920/1080" className="responsive-img" />
					<div className="author">
						<span>Admin</span>
					</div>
					<div className="content">
						<div className="title">Title</div>
						<div className="excerpt">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
							galley of type and scrambled it to make a type specimen book. It has survived not only five
							centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
							passages, and more recently with desktop publishing software like Aldus PageMaker including
							versions of Lorem Ipsum.
						</div>
						<Button variant="light">Read More</Button>
					</div>
				</div>
				<div>
					<img src="https://picsum.photos/1920/1080" className="responsive-img" />
					<div className="author">
						<span>Admin</span>
					</div>
					<div className="content">
						<div className="title">Title</div>
						<div className="excerpt">
							Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
							of classical Latin literature from 45 BC, making it over 2000 years old.
						</div>
						<Button variant="light">Read More</Button>
					</div>
				</div>
				<div>
					<img src="https://picsum.photos/1920/1080" className="responsive-img" />
					<div className="author">
						<span>Admin</span>
					</div>
					<div className="content">
						<div className="title">Title</div>
						<div className="excerpt">
							Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia
						</div>
						<Button variant="light">Read More</Button>
					</div>
				</div>
				<div>
					<img src="https://picsum.photos/1920/1080" className="responsive-img" />
					<div className="author">
						<span>Admin</span>
					</div>
					<div className="content">
						<div className="title">Title</div>
						<div className="excerpt">
							a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure
							Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the
							word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from
							sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
							Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very
							popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
							amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since
							the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de
							Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
							accompanied by English versions from the 1914 translation by H. Rackham.
						</div>
						<Button variant="light">Read More</Button>
					</div>
				</div>
				<div>
					<img src="https://picsum.photos/1920/1080" className="responsive-img" />
					<div className="author">
						<span>Admin</span>
					</div>
					<div className="content">
						<div className="title">Title</div>
						<div className="excerpt">
							a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure
							Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the
							word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from
							sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
							Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very
							popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
							amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since
							the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de
							Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
							accompanied by English versions from the 1914 translation by H. Rackham.
						</div>
						<LinkContainer to={'/news/show'}>
							<Button className="mt-3" variant="light">
								Read More
							</Button>
						</LinkContainer>
					</div>
				</div>
			</Masonry>
		</React.Fragment>
	);
};

export default Home;
