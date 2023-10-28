import { useContext, useEffect, useState } from "react";
import Context from "../context/context";
import { PageHeading, Body } from "../common/typography";
import { DateTime } from "luxon";
import styled from "@emotion/styled";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-inline: auto;
	width: 1200px;
	@media (max-width: 1200px) {
		width: 750px;
	}
`;

const ResidentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Resident = () => {
	const { context, setContext } = useContext(Context);
	const [resident, setResident] = useState(null);

	const { residents, selectedResidentId } = context;

	console.log("### residents: ", residents);
	console.log("### selectedResidentId: ", selectedResidentId);

	useEffect(() => {
		const selected = residents.find((resident) => resident.id === selectedResidentId);
		console.log("### selected: ", selected);
		setResident(selected);
	}, []);

	return (
		<Container>
			{resident ? (
				<ResidentContainer>
					<PageHeading>
						{resident.firstName} {resident.lastName}
					</PageHeading>
					<div>
						<Body>Gender: {resident.gender}</Body>
						<Body>DOB: {DateTime.fromISO(resident.dob).toLocaleString(DateTime.DATE_MED)}</Body>
						<Body>Email: {resident.email}</Body>
					</div>
				</ResidentContainer>
			) : (
				"LOADING..."
			)}
		</Container>
	);
};

export default Resident;
