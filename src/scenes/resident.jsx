import { useContext, useEffect, useState } from "react";
import Context from "../context/context";
import { PageHeading, Body } from "../common/typography";
import { DateTime } from "luxon";
import styled from "@emotion/styled";

import { colors } from "../styles/theme";
import api from "../api/api";
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

const SubContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${colors.primary[400]};
	border-radius: 8px;
`;
const Resident = () => {
	const { context, setContext } = useContext(Context);
	const { selectedResident } = context;
	const [residentInfo, setResidentInfo] = useState("");

	console.log("### Resident", selectedResident);

	const { id, firstName, lastName, gender, dob } = selectedResident;

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				const response = await api.getResident(id);
				if (isMounted) {
					console.log("### resident", response);
					setResidentInfo(response);
				}
			} catch (error) {
				console.error("Error fetching resident data:", error);
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
	}, []);

	const calculateAge = (dob) => {
		const today = DateTime.local();
		const age = Math.floor(today.diff(dob, "years").years);
		return age;
	};
	return (
		<>
			<Container>
				{selectedResident && (
					<HeadContainer>
						<InfoContainer>
							<ResidentName>
								{firstName} {lastName}
							</ResidentName>
							<div>
								<Body>Gender: {gender}</Body>
								<Body>DOB: {DateTime.fromISO(dob).toLocaleString(DateTime.DATE_MED)}</Body>
								<Body>Age: {calculateAge(DateTime.fromISO(dob))}</Body>
							</div>
						</InfoContainer>
						<ImageContainer>
							<Image src={blankImage} alt="blank picture" style={{ width: "200px", height: "240px" }} />
						</ImageContainer>
					</HeadContainer>
				)}
				{residentInfo && (
					<SubContainer>
						<Body>
							Nationality:{" "}
							{residentInfo.nationalities.map((nationality) => (
								<p key={nationality}>{nationality}</p>
							))}
						</Body>
						<Body>
							Language:{" "}
							{residentInfo.languagues.map((language) => (
								<p key={language}>{language}</p>
							))}
						</Body>
						<Body>
							Religion:{" "}
							{residentInfo.religions.map((religion) => (
								<p key={religion}>{religion}</p>
							))}
						</Body>
						<Body>
							Activities:{" "}
							{residentInfo.activities.map((activity) => (
								<p key={activity}>{activity}</p>
							))}
						</Body>
					</SubContainer>
				)}
			</Container>
		</>
	);
};

export default Resident;
