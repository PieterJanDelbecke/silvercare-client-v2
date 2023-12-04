import { useContext, useEffect, useState } from "react";
import { PageHeading, Body } from "../common/typography";
import { DateTime } from "luxon";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import Context from "../context/context";
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
	width: 850px;
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: ${colors.primary[400]};
	border-radius: 8px;
	@media (max-width: 1200px) {
		width: 720px;
	}
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
	width: 850px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	background-color: ${colors.primary[400]};
	border-radius: 8px;
	margin-top: 24px;
	padding: 24px;
	gap: 4px;
	@media (max-width: 1200px) {
		width: 720px;
	}
`;

const SubjectContainer = styled.div``;

const Subject = styled.span`
	display: inline-block;
	color: ${colors.greenAccent[500]};
	width: 90px;
`;

const InfoItems = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding-left: 24px;
`;

const InfoItem = styled.span`
	text-transform: capitalize;
	padding-inline: 8px;
	border-right: ${(props) => (props.isActivity ? `1px solid ${colors.blueAccent[500]}` : null)};
`;

const ActivitiesContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

const Activities = styled.div`
	display: flex;
	width: 90%;
`;

const EditButton = styled.button`
	border: 1px solid ${colors.primary[100]};
	padding: 2px 3px;
	border-radius: 4px;
`;

const Resident = () => {
	const navigate = useNavigate();
	const { context, setContext } = useContext(Context);
	const { selectedResident } = context;
	const { id, firstName, lastName, gender, dob } = selectedResident;

	const [residentInfo, setResidentInfo] = useState("");
	const [residentActivities, setResidentActivities] = useState([]);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				const response = await api.getResident(id);
				const {
					info: residentInfo,
					residentActivities,
					editResidentActivities,
					editActivitiesInitialValues,
				} = response;
				if (isMounted) {
					setResidentInfo(residentInfo);
					setResidentActivities(residentActivities);
					setContext({ ...context, editResidentActivities, editActivitiesInitialValues });
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

	const handleEdit = () => {
		navigate("/residentEditActivities");
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
						<SubjectContainer>
							<Subject>Nationality:</Subject>
							{residentInfo.nationalities.map((nationality) => (
								<InfoItem key={nationality}>{nationality}</InfoItem>
							))}
						</SubjectContainer>
						<SubjectContainer>
							<Subject>Language:</Subject>
							{residentInfo.languagues.map((language) => (
								<InfoItem key={language}>{language}</InfoItem>
							))}
						</SubjectContainer>
						<SubjectContainer>
							<Subject>Religion:</Subject>
							{residentInfo.religions.map((religion) => (
								<InfoItem key={religion}>{religion}</InfoItem>
							))}
						</SubjectContainer>
						<ActivitiesContainer>
							<Activities>
								<Subject>Activities:</Subject>
								<InfoItems>
									{residentActivities.map((item) => (
										<InfoItem isActivity={true} key={item.Activity.activity}>
											{item.Activity.activity}
										</InfoItem>
									))}
								</InfoItems>
							</Activities>
							<EditButton onClick={handleEdit}>edit</EditButton>
						</ActivitiesContainer>
					</SubContainer>
				)}
			</Container>
		</>
	);
};

export default Resident;
