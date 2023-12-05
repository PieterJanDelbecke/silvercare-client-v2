import axios from "./axios";

const firstLoad = async () => {
	try {
		const { status, data } = await axios.get(`/admin/firstload`);
		if (status === 200 || status === 201) {
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
	}
};

const adminApi = {
	firstLoad,
};

export default adminApi;
