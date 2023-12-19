import { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import {
	Container,
	InputsContainer,
	Grid,
	InputContainer,
	InputLabel,
	Error,
	selectOptionStyles,
	Input,
	ButtonContainer,
	SubmitButton,
} from "../common/styling-forms";
import { PageHeading } from "../common/typography";
import Select from "react-select";
import { useMediaQuery } from "@mui/material";
import Context from "../context/context";
import { mediaQueryMinWidth } from "../common/lib";

const ActivityNewForm = () => {
	const navigate = useNavigate();
	const isDesktop = useMediaQuery(mediaQueryMinWidth);
	const { context, setContext } = useContext(Context);
	const { activities, team } = context;

	const selectActivities = [];
	activities.forEach((activity) => {
		selectActivities.push({ value: activity.id, label: activity.activity });
	});
	const [selectedActivity, setSelectedActivity] = useState(selectActivities[0]);
	const [selectedTeamMember, setSelectedTeamMember] = useState(team[0]);

	const initialValues = {
		date: "",
		comment: "",
	};

	const checkoutSchema = Yup.object().shape({
		date: Yup.string().required("required"),
	});
	const handleFormSubmit = (values) => {
		const { date, comment } = values;
		const newActivityValues = {
			date,
			comment,
			activity: selectedActivity,
			teamMember: selectedTeamMember,
		};
		console.log("### newActivityValues", newActivityValues);

		// TODO: do backend
		const result = true;
		if (result) {
			setContext({ ...context, newActivityValues });
			navigate("/activityNewAttendance");
		}
	};
	return (
		<Container>
			<PageHeading>New Activity Form</PageHeading>
			<InputsContainer>
				<Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
					{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<Grid isDesktop={isDesktop}>
								<InputContainer>
									<InputLabel>Activity</InputLabel>
									<Select
										options={selectActivities}
										defaultValue={selectedActivity}
										onChange={setSelectedActivity}
										styles={selectOptionStyles}
									/>
									<Error>{selectedActivity.length === 0 ? "required" : null}</Error>
								</InputContainer>
								<InputContainer>
									<InputLabel>Date</InputLabel>
									<Input
										type="date"
										name="date"
										id="date"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.date}
									/>
									{<Error>{!!touched.date && !!errors.date ? errors.date : null}</Error>}
								</InputContainer>
								<InputContainer>
									<InputLabel>Team Member</InputLabel>
									<Select
										options={team}
										defaultValue={selectedTeamMember}
										onChange={setSelectedTeamMember}
										styles={selectOptionStyles}
									/>
									{<Error>{!!touched.teamMember && !!errors.teamMember ? errors.teamMember : null}</Error>}
								</InputContainer>
								<InputContainer>
									<InputLabel>Comment</InputLabel>
									<Input
										type="text"
										name="comment"
										id="comment"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.comment}
									/>
									{/* {<Error>{!!touched.date && !!errors.date ? errors.date : null}</Error>} */}
								</InputContainer>
							</Grid>
							<ButtonContainer>
								<SubmitButton
									// disabled={!selectedNationalities.length || !selectedLangauges.length || !selectedReligions.length}
									type="submit"
								>
									Next
								</SubmitButton>
							</ButtonContainer>
						</form>
					)}
				</Formik>
			</InputsContainer>
		</Container>
	);
};

export default ActivityNewForm;
