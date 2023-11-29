import { useEffect, useState, useContext } from "react";
import styled from "@emotion/styled";

import api from "../api/api";
import Context from "../context/context";

const ResidentEditActivities = () => {
	const { context, setContext } = useContext(Context);
	console.log("### context: ", context);
	const { selectedResident } = context;
	const residentId = selectedResident?.id || "42b93927-1525-43fa-ae20-0dd01e4888e7";

	const [residentActivities, setResidentActivities] = useState({});

	useEffect(() => {
		let isMounted = true;
		try {
			const fetchData = async () => {
				const result = await api.getResidentActivities(residentId);
				if (isMounted) {
					console.log("### residentActivities", result);
					setResidentActivities(result);
				}
			};
			fetchData();
		} catch (error) {
			console.error(error);
		}
		() => {
			isMounted = false;
		};
	}, []);

	return (
		<div>
			<h1>Edit activities</h1>
		</div>
	);
};

export default ResidentEditActivities;
