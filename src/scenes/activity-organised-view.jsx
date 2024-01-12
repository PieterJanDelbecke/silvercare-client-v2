import { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import Context from "../context/context";
import { PageHeading, Heading, Subheading } from "../common/typography";
import { colors } from "../styles/theme";
import Icon from "../common/icons";
import { Body } from "../common/typography";
import activitiesApi from "../api/activities.api";

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

const ActivityName = styled(PageHeading)`
	color: ${colors.greenAccent[500]};
`;

const ActivityOrganisedView = () => {
	const { context, setContext } = useContext(Context);

	const { newActivityValues } = context;
	console.log("### newActivityValues", newActivityValues);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await activitiesApi.getOrganisedActivity(newActivityValues.activityId);
				console.log("### result: ", result);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	return (
		<Container>
			<HeadContainer>
				<div>
					<Body>Organised Activity:</Body>
					<ActivityName>Bingo</ActivityName>
					<Body>Date: 11-01-2024</Body>
					<Body>Comment: extreme bingo</Body>
				</div>
			</HeadContainer>
			<SubContainer>
				<div>
					<Body>Participants</Body>
					<Body>Johny Gibson</Body>
					<Body>Alexa Carter</Body>
				</div>
			</SubContainer>
		</Container>
	);
};

export default ActivityOrganisedView;
