import { toast } from 'react-toastify';
export const sendToast = (type, msg) => {
	if (type === 'success') {
		return toast.success(msg, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark'
		});
	} else {
		return toast.error(msg, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark'
		});
	}
};
