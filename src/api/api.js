import axios from "./axios";

const getActivities = async () => {
	try {
		const { status, data } = await axios.get(`/admin/activities`);
		if (status === 200 || status === 201) {
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
	}
};

const getResidents = async () => {
	try {
		const { status, data } = await axios.get(`/resident/residents`);

		if (status === 200 || status === 201) {
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
	}
};

const getResident = async (uuid) => {
	try {
		const { status, data } = await axios.get(`/resident/${uuid}`);
		if (status === 200 || status === 201) {
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
	}
};

const addResident = async (newResident) => {
	try {
		const { status, data } = await axios.post(`/resident/add`, newResident);
		if (status === 200 || status === 201) {
			return data;
		} else {
			console.log("request unsuccessfull");
			return null;
		}
	} catch (error) {
		console.log(error);
	}
};

const api = {
	getActivities,
	getResidents,
	getResident,
	addResident,
};

export default api;
