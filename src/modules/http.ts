import axios from 'axios';

export const axiosInstance = axios.create({
	headers: {
		'X-WEB-CLIENT': 'true',
	},
});