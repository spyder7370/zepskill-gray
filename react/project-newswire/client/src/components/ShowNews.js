import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsById } from '../store/actions/index';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import { toast } from 'react-toastify';

const ShowNews = () => {
	const newsItem = useSelector((store) => store.newsReducer.newsItem);
	// console.log(allNews);
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();

	// console.log(params);
	useEffect(
		() => {
			dispatch(fetchNewsById(params.id));
		},
		[ dispatch, params ]
	);

	const deleteNewsFromDb = async () => {
		await axios.delete(`https://zepskillgraynewswireapi.onrender.com/news/${params.id}`);
		toast.success('successfully deleted the news', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark'
		});
		navigate('/');
	};

	return (
		<React.Fragment>
			{newsItem ? (
				<div className="article_container">
					<h1>{newsItem.title}</h1>
					{/* <img src="https://picsum.photos/1920/1080" /> */}
					<div style={{ backgroundImage: `url(${newsItem.image})` }} className="image" />
					<div className="author">
						<span>created by: {newsItem.author}</span>
						<div>
							created at: <Moment format="DD/MM/YYYY">{newsItem.createdAt}</Moment>
						</div>
					</div>
					<div className="my-3 content">{newsItem.content}</div>
					<LinkContainer to={`/news/${params.id}/edit`}>
						<button className="btn btn-warning mb-3">Edit</button>
					</LinkContainer>
					<button onClick={deleteNewsFromDb} className="ms-2 btn btn-danger mb-3">
						Delete
					</button>
				</div>
			) : null}
		</React.Fragment>
	);
};

export default ShowNews;
