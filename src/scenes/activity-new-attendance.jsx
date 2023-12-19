import {
	Container,
	InputsContainer,
	ResidentName,
	FormContainer,
	FormSpan,
	FormLabel,
	FormInput,
	Error,
	SubmitButton,
	ButtonContainer,
} from "../common/styling-checkbox-forms";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useMediaQuery } from "@mui/material";

import { mediaQueryMinWidth } from "../common/lib";
// import api from "../api/api";
import activitiesApi from "../api/activities.api";
import Context from "../context/context";
import { PageHeading, Subheading } from "../common/typography";
import { colors } from "../styles/theme";

const ActivityNewAttendance = () => {
	const isDesktop = useMediaQuery(mediaQueryMinWidth);
	const { context, setContext } = useContext(Context);
	const navigate = useNavigate();
	const { residents, newActivityValues } = context;

	const activity = newActivityValues.label;

	const initialValues = {
		attendingResidents: [],
	};

	const checkoutSchema = Yup.object().shape({
		attendingResidents: Yup.array().min(1, "select at least one option"),
	});

	const handleFormSubmit = async (values) => {
		console.log("### VALUES", values);
		const { attendingResidents } = values;
		const result = await activitiesApi.newActivity({ newActivityValues, attendingResidents });
		console.log("### RESULT:", result);
		if (result) {
			navigate("/");
		}
	};

	return (
		<Container>
			<PageHeading>Attending Residents</PageHeading>
			<InputsContainer isDesktop={isDesktop}>
				<ResidentName>{activity}</ResidentName>
				<Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
					{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<FormContainer role="group" aria-labelledby="checkbox-group">
								{residents.map((resident) => (
									<FormSpan isDesktop={isDesktop} key={resident.id}>
										<FormInput type="checkbox" name="attendingResidents" value={resident.id.toString()} />
										<FormLabel>
											{resident.firstName} {resident.lastName}
										</FormLabel>
									</FormSpan>
								))}
							</FormContainer>
							{
								<Error>
									{!!touched.selectedResidents && !!errors.selectedResidents ? errors.selectedResidents : null}
								</Error>
							}
							<ButtonContainer>
								<SubmitButton type="submit">Submit</SubmitButton>
							</ButtonContainer>
						</form>
					)}
				</Formik>
			</InputsContainer>
		</Container>
	);
};

export default ActivityNewAttendance;
