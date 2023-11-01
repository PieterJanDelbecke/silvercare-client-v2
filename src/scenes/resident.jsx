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
	const { selectedResident: resident } = context;

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
