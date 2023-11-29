import axios from "./axios";

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

const getResident = async (residentId) => {
	console.log("### 2 ###");
	console.log("### residentId ", residentId);
	try {
		const { status, data } = await axios.get(`/resident/resident`, { residentId });
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

const addResidentActivities = async (residentActivities) => {
	try {
		const { status, data } = await axios.post(`/resident/addActivities`, residentActivities);
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

const getResidentActivities = async (residentId) => {
	console.log("### 5 ###");

	try {
		const { status, data } = await axios.get(`/resident/residentActivities`, residentId);
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
	getResidents,
	getResident,
	addResident,
	addResidentActivities,
	getResidentActivities,
};

export default api;
