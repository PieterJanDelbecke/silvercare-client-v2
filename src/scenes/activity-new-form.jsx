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
} from "../common/styling";
import { PageHeading } from "../common/typography";
import Select from "react-select";
import { useMediaQuery } from "@mui/material";
import Context from "../context/context";
import { mediaQueryMinWidth } from "../common/lib";

const ActivityNewForm = () => {
	const { context, setContext } = useContext(Context);
	const { selectActivities } = context;
	const isDesktop = useMediaQuery(mediaQueryMinWidth);
	const [selectedActivity, setSelectedActivity] = useState(selectActivities[0]);
	const navigate = useNavigate();

	const initialValues = {
		date: "",
		comment: "",
		instructor: "",
	};

	const checkoutSchema = Yup.object().shape({
		date: Yup.string().required("required"),
	});
	const handleFormSubmit = (values) => {
		const { date, comment, instructor } = values;
		console.log("### SUBMIT values", values);
		console.log("### SUBMIT activity", selectedActivity);
		//TODO: do backend
		const result = true;
		if (result) {
			navigate("/newActivityAttendance");
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
									<InputLabel>Instructor</InputLabel>
									<Input
										type="text"
										name="instructor"
										id="instructor"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.instructor}
									/>
									{/* {<Error>{!!touched.date && !!errors.date ? errors.date : null}</Error>} */}
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
									Submit
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
