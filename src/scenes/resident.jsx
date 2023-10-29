import { useContext, useEffect, useState } from "react";
import Context from "../context/context";
import { PageHeading, Body } from "../common/typography";
import { DateTime } from "luxon";
import styled from "@emotion/styled";
import { colors } from "../styles/theme";

// import residents from "../data/residentsMockData.json"; // remove when finished
import blankImage from "../images/blank-profile-picture.png";

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

const HeadContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	/* border: 1px solid red; */
	background-color: ${colors.primary[400]};
	border-radius: 8px;
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 400px;
	padding: 24px;
`;

const ImageContainer = styled.div`
	/* border: 1px solid yellow; */
	width: 400px;
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

const Image = styled.img`
	margin: 24px;
`;

const ResidentName = styled(PageHeading)`
	color: ${colors.greenAccent[500]};
`;

const Resident = () => {
	const { context, setContext } = useContext(Context);
	const [resident, setResident] = useState(null);

	const { residents, selectedResidentId } = context;

	// const selectedResidentId = "4ff0db76-60e4-40e2-b60b-afdad444187a";

	// console.log("### residents: ", residents);
	// console.log("### selectedResidentId: ", selectedResidentId);

	useEffect(() => {
		const selected = residents.find((resident) => resident.id === selectedResidentId);
		console.log("### selected: ", selected);
		setResident(selected);
	}, []);

	const calculateAge = (dob) => {
		const today = DateTime.local();
		const age = Math.floor(today.diff(dob, "years").years);
		return age;
	};
	return (
		<>
			{resident ? (
				<Container>
					<HeadContainer>
						<InfoContainer>
							<ResidentName>
								{resident.firstName} {resident.lastName}
							</ResidentName>
							<div>
								<Body>Gender: {resident.gender}</Body>
								<Body>DOB: {DateTime.fromISO(resident.dob).toLocaleString(DateTime.DATE_MED)}</Body>
								<Body>Age: {calculateAge(DateTime.fromISO(resident.dob))}</Body>
							</div>
						</InfoContainer>
						<ImageContainer>
							<Image src={blankImage} alt="blank picture" style={{ width: "200px", height: "240px" }} />
						</ImageContainer>
					</HeadContainer>
				</Container>
			) : (
				"LOADING..."
			)}
		</>
	);
};

export default Resident;
