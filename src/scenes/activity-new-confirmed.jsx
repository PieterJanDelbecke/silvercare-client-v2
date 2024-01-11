import { useState, useContext } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import Context from "../context/context";
import { PageHeading, Heading, Subheading } from "../common/typography";
import { colors } from "../styles/theme";
import Icon from "../common/icons";
import { Body } from "../common/typography";

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
	margin-top: 48px;
	width: 850px;
	display: flex;
	padding: 24px;
	justify-content: space-between;
	background-color: ${colors.primary[400]};
	border-radius: 8px;
	@media (max-width: 1200px) {
		width: 720px;
	}
`;

const SubContainer = styled(HeadContainer)`
	justify-content: center;
	gap: 40px;
`;

const ResidentName = styled(PageHeading)`
	color: ${colors.greenAccent[500]};
`;

const Button = styled.button`
	cursor: pointer;
	margin: 6px;
	padding: 6px;
	display: flex;
	align-items: center;
	border: 1px solid ${colors.grey[100]};
	border-radius: 8px;
`;

const IconButton = styled(Button)`
	flex-direction: column;
	border: none;
	gap: 4px;
`;

const ActivityNewConfirmed = () => {
	const { context, setContext } = useContext(Context);
	const { newActivityValues: activity } = context;

	const navigate = useNavigate();

	console.log("### activity", activity);

	const formatDate = (inputDate) => {
		let regex = /(\d{4})-(\d{2})-(\d{2})/;
		let match = regex.exec(inputDate);
		let year = match[1];
		let month = match[2];
		let day = match[3];

		let outputDate = `${day}-${month}-${year}`;
		return outputDate;
	};

	let activityDate = formatDate(activity.date);

	const handleView = () => {
		// setContext({ ...context, selectedResident: resident });
		navigate("/activityOrganisedView");
	};

	return (
		<Container>
			<HeadContainer>
				<div>
					<Body>Successfully added</Body>
					<ResidentName>{activity.activity.label}</ResidentName>
					<Body>{activityDate}</Body>
				</div>
				<Button onClick={handleView}>View</Button>
			</HeadContainer>
			<SubContainer>
				<IconButton onClick={() => navigate("/activityNewForm")}>
					<Icon name="form" />
					<Body>Add Activity</Body>
				</IconButton>
				<IconButton onClick={() => navigate("/")}>
					<Icon name="home" onClick={() => navigate("/")} />
					<Body>Dashboard</Body>
				</IconButton>
			</SubContainer>
		</Container>
	);
};

export default ActivityNewConfirmed;
