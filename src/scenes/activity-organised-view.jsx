import { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

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
	/* justify-content: center; */
	gap: 40px;
`;

const ActivityName = styled(PageHeading)`
	color: ${colors.greenAccent[500]};
`;

const ActivitySubHeading = styled(Subheading)`
	font-weight: 500;
	color: ${colors.greenAccent[500]};
`;

const Participant = styled(Body)`
	&:hover {
		cursor: pointer;
	}
`;

const ActivityOrganisedView = () => {
	const navigate = useNavigate();
	const { context, setContext } = useContext(Context);
	const [organisedActivity, setOrganisedActivity] = useState(null);

	const { newActivityValues } = context;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await activitiesApi.getOrganisedActivity(newActivityValues.activityId);
				setOrganisedActivity(result);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const handleViewResident = (resident) => {
		setContext({ ...context, selectedResident: resident });
		navigate("/resident");
	};

	return (
		<Container>
			<PageHeading>Organised Activity</PageHeading>
			{organisedActivity && (
				<>
					<HeadContainer>
						<div>
							<ActivityName>{organisedActivity.Activity.activity}</ActivityName>
							<Body>Date: {DateTime.fromISO(organisedActivity.date).toLocaleString(DateTime.DATE_MED)}</Body>
							<Body>Comment: {organisedActivity.comment}</Body>
						</div>
					</HeadContainer>
					<SubContainer>
						<div>
							<ActivitySubHeading>Participants</ActivitySubHeading>
							{organisedActivity.OrganisedActivityAttendences.map((attendee) => (
								<div key={attendee.Resident.id}>
									<Participant onClick={() => handleViewResident(attendee.Resident)}>
										{attendee.Resident.firstName} {attendee.Resident.lastName}
									</Participant>
								</div>
							))}
						</div>
					</SubContainer>
				</>
			)}
		</Container>
	);
};

export default ActivityOrganisedView;
