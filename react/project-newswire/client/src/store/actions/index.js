import axios from 'axios';

const fetchNewsHelper = async () => {
	try {
		const res = await axios.get('https://zepskillgraynewswireapi.onrender.com/news');
		// console.log(res.data);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

const fetchNewsByIdHelper = async (id) => {
	try {
		const res = await axios.get(`https://zepskillgraynewswireapi.onrender.com/news/${id}`);
		console.log(res.data);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const fetchNews = () => {
	return {
		type: 'fetch_news',
		payload: fetchNewsHelper()
	};
};

export const fetchNewsById = (id) => {
	return {
		type: 'fetch_news_by_id',
		payload: fetchNewsByIdHelper(id)
	};
};
