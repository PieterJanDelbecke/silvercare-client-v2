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

const getResident = async (uuid) => {
	try {
		const { status, data } = await axios.get(`/resident/${uuid}`);

		if (status === 200 || status === 201) {
			const nationalities = [];
			const languagues = [];
			const religions = [];
			const activities = [];
			data.forEach((item) => {
				const { infoId, info } = item;
				switch (infoId) {
					case 1:
						nationalities.push(info);
						break;
					case 2:
						languagues.push(info);
						break;
					case 3:
						religions.push(info);
						break;
					case 4:
						activities.push(info);
						break;
					default:
						console.log("ERROR");
						break;
				}
			});
			return { nationalities, languagues, religions, activities };
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
			console.log(data);
		} else {
			console.log("request unsuccessfull");
		}
	} catch (error) {
		console.log(error);
	}
};

const api = {
	getResidents,
	getResident,
	addResident,
};

export default api;
