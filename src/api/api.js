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
	try {
		const { status, data } = await axios.get(`/resident/resident?residentId=${residentId}`);
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

const editResidentActivities = async (editedResidentActivities) => {
	try {
		const { status, data } = await axios.post(`/resident/editActivities`, { editedResidentActivities });
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
	try {
		const { status, data } = await axios.get(`/resident/residentActivities?residentId=${residentId}`);
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

const getResidentAttendenceData = async (residentId) => {
	try {
		const { status, data } = await axios.get(`resident/attendenceData?residentId=${residentId}`);
		if (status === 200 || status === 201) {
			return data;
		} else {
			console.log("request unsuccessfull");
			return null;
		}
	} catch (error) {
		console.error(error);
	}
};

const api = {
	getResidents,
	getResident,
	addResident,
	addResidentActivities,
	editResidentActivities,
	getResidentActivities,
	getResidentAttendenceData,
};

export default api;
