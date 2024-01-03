import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useMediaQuery } from "@mui/material";

import { mediaQueryMinWidth } from "../common/lib";
import api from "../api/api";
import activitiesApi from "../api/activities.api";
import Context from "../context/context";
import { PageHeading, Subheading } from "../common/typography";
import { colors } from "../styles/theme";

const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const InputsContainer = styled.div`
	width: ${(props) => (props.isDesktop ? "80%" : "100%")};
	padding-left: 24px;
`;

const ResidentName = styled(Subheading)`
	padding-bottom: 8px;
	padding-left: 24px;
	color: ${colors.greenAccent[500]};
`;

const FormContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-block: 12px;
	padding-left: 12px;
`;

const FormSpan = styled.span`
	width: ${(props) => (props.isDesktop ? "30%" : "45%")};
	margin: 6px;
`;

const FormLabel = styled.label`
	margin-left: 4px;
	min-width: 80px;
`;

const FormInput = styled(Field)`
	transform: scale(1.5);
	margin-right: 5px;
`;

const Error = styled.p`
	font-size: 12px;
	color: red;
	margin-left: 8px;
	height: 16px;
`;

const SubmitButton = styled.button`
	cursor: pointer;
	margin-block: 16px;
	width: 160px;
	height: 36px;
	border-radius: 8px;
	background-color: ${colors.greenAccent[500]};
	color: ${colors.primary[500]};
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	padding-right: 36px;
`;

const ResidentSetActivities = () => {
	const isDesktop = useMediaQuery(mediaQueryMinWidth);
	const { context, setContext } = useContext(Context);
	const navigate = useNavigate();
	const { lastNewResident: resident } = context;
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				const result = await activitiesApi.getActivities();
				if (isMounted) {
					setActivities(result);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
	}, []);

	const initialValues = {
		activityOptions: [],
	};

	const checkoutSchema = Yup.object().shape({
		activityOptions: Yup.array().min(1, "select at least one option"),
	});

	const handleFormSubmit = async (values) => {
		const { activityOptions } = values;

		const activityIds = activityOptions.map((option) => {
			return +option;
		});
		const result = await api.addResidentActivities({ residentId: resident.id, activityIds });
		if (result) {
			navigate("/residentNew");
		}
	};

	return (
		<Container>
			<PageHeading>Interest of Activities</PageHeading>
			{activities && (
				<InputsContainer isDesktop={isDesktop}>
					<ResidentName>
						{resident.firstName} {resident.lastName}
					</ResidentName>
					<Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
						{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<FormContainer role="group" aria-labelledby="checkbox-group">
									{activities.map((activity) => (
										<FormSpan isDesktop={isDesktop} key={activity.id}>
											<FormInput type="checkbox" name="activityOptions" value={activity.id.toString()} />
											<FormLabel>{activity.activity}</FormLabel>
										</FormSpan>
									))}
								</FormContainer>
								{<Error>{!!touched.activityOptions && !!errors.activityOptions ? errors.activityOptions : null}</Error>}
								<ButtonContainer>
									<SubmitButton type="submit">Submit</SubmitButton>
								</ButtonContainer>
							</form>
						)}
					</Formik>
				</InputsContainer>
			)}
		</Container>
	);
};

export default ResidentSetActivities;
