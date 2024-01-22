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

const getOrganisedActivity = async (activityId) => {
	try {
		const { status, data } = await axios.get(`/activity/organisedActivity?organisedActivityId=${activityId}`);
		if (status === 200 || status === 201) {
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
	}
};

const newActivity = async (values) => {
	try {
		const { status, data } = await axios.post(`activity/new`, values);
		if (status === 200 || status === 201) {
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error(error);
	}
};

const activitiesApi = {
	getActivities,
	getOrganisedActivity,
	newActivity,
};

export default activitiesApi;
