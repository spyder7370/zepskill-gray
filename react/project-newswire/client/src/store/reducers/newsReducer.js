export default function newsReducer(oldStore = {}, action) {
	switch (action.type) {
		case 'fetch_news':
			return { ...oldStore, allNews: action.payload };
		case 'fetch_news_by_id':
			return { ...oldStore, newsItem: action.payload };
		default:
			return oldStore;
	}
}
