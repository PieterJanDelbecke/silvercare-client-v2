import { useState } from "react";
import styled from "@emotion/styled";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { PageHeading } from "../common/typography";
import { colors } from "../styles/theme";
import { useMediaQuery } from "@mui/material";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const InputsContainer = styled.div`
	margin: 20px;
	width: 100%;
`;

const Grid = styled.div`
	padding-inline: 36px;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	grid-column-gap: 24px;
	grid-row-gap: 8px;

	& > div {
		grid-column: ${(props) => (props.isDesktop ? undefined : "span 4")};
	}
`;

const InputContainer = styled.div`
	grid-column: 4 span;
`;

const Input = styled.input`
	border-radius: 6px;
	padding-left: 14px;
	height: 40px;
	width: 100%;
	background-color: ${colors.grey[100]};
	:focus {
		outline: none;
	}
`;

const InputLabel = styled.p`
	font-size: 12px;
	margin-left: 8px;
	height: 16px;
`;

const Error = styled.p`
	font-size: 12px;
	color: red;
	margin-left: 8px;
	height: 16px;
`;

const RadioContainer = styled.div`
	display: flex;
	margin-top: 12px;
`;

const RadioLabel = styled.label`
	margin-left: 12px;
	width: 80px;
`;

const RadioInput = styled(Field)`
	transform: scale(1.5);
	margin-right: 5px;
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
	justify-content: flex-end;
	padding-right: 36px;
`;

const selectOptionStyles = {
	container: (baseStyles) => ({
		...baseStyles,
		backgroundColor: colors.grey[100],
		borderRadius: "6px;",
	}),
	control: (baseStyles) => ({
		...baseStyles,
		backgroundColor: colors.grey[100],
	}),
	option: (baseStyles) => ({
		...baseStyles,
		color: "black",
		// backgroundColor: colors.grey[100],
	}),
	multiValueLabel: (baseStyles) => ({
		...baseStyles,
		backgroundColor: colors.greenAccent[500],
		fontSize: "16px",
		borderRadius: "2px 0px 0px 2px",
	}),
	multiValueRemove: (baseStyles) => ({
		...baseStyles,
		backgroundColor: colors.greenAccent[500],
		borderRadius: "0px 2px 2px 0px",
	}),
};

const ResidentForm = () => {
	const isDesktop = useMediaQuery("(min-width:820px)");

	const [selectedNationality, setSelectedNationality] = useState({ value: "Australia", label: "Australia" });
	const [selectedLangauge, setSelectedLangauge] = useState({ value: "English", label: "English" });
	const [selectedReligion, setSelectedReligion] = useState({ value: "Christian", label: "Christian" });

	const nationalityOptions = [
		{ value: "Australia", label: "Australia" },
		{ value: "Italy", label: "Italy" },
		{ value: "Greece", label: "Greece" },
		{ value: "New Zealand", label: "New Zealand" },
	];

	const languageOptions = [
		{ value: "English", label: "English" },
		{ value: "Italian", label: "Italian" },
		{ value: "Greek", label: "Greek" },
	];

	const religionOptions = [
		{ value: "Christian", label: "Christian" },
		{ value: "Jewish", label: "Jewish" },
		{ value: "Buddhist", label: "Buddhist" },
		{ value: "Muslim", label: "Muslim" },
		{ value: "Hindu", label: "Hindu" },
		{ value: "Atheist", label: "Atheist" },
	];

	const initialValues = {
		firstName: "",
		lastName: "",
		dob: "",
		gender: "",
		practicingReligion: "",
	};

	const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

	const checkoutSchema = Yup.object().shape({
		firstName: Yup.string().required("required"),
		lastName: Yup.string().required("required"),
		dob: Yup.string().matches(dateRegex, "Invalid date").required("required"),
		gender: Yup.string().required("required"),
		practicingReligion: Yup.string().required("required"),
		// email: Yup.string().email("Invalid email address").required("required"),
	});

	const handleFormSubmit = (values) => {
		console.log(values);
		console.log(selectedNationality);
	};
	return (
		<Container>
			<PageHeading>Resident Form</PageHeading>
			<InputsContainer>
				<Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
					{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<Grid isDesktop={isDesktop}>
								<InputContainer>
									<InputLabel>First Name:</InputLabel>
									<Input
										type="text"
										name="firstName"
										id="firstName"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.firstName}
										// placeholder="First Name"
									/>
									{<Error>{!!touched.firstName && !!errors.firstName ? errors.firstName : null}</Error>}
								</InputContainer>
								<InputContainer>
									<InputLabel>Last Name:</InputLabel>
									<Input
										type="text"
										name="lastName"
										id="lastName"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.lastName}
										// placeholder="Last Name"
									/>
									{<Error>{!!touched.lastName && !!errors.lastName ? errors.lastName : null}</Error>}
								</InputContainer>
								<InputContainer>
									<InputLabel>DOB (dd/mm/yyyy)</InputLabel>
									<Input
										type="text"
										name="dob"
										id="dob"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.dob}
										// placeholder="dd/mm/yyyy"
									/>
									{!!touched.dob && !!errors.dob ? <Error>{errors.dob}</Error> : null}
								</InputContainer>
								<RadioContainer role="group" aria-labelledby="my-gender-group">
									<RadioLabel>
										<RadioInput type="radio" name="gender" value="male" /> Male
									</RadioLabel>
									<RadioLabel>
										<RadioInput type="radio" name="gender" value="female" /> Female
									</RadioLabel>
									{<Error>{!!touched.gender && !!errors.gender ? errors.gender : null}</Error>}
								</RadioContainer>
								<InputContainer>
									<InputLabel>Nationality</InputLabel>
									<Select
										options={nationalityOptions}
										defaultValue={selectedNationality}
										onChange={setSelectedNationality}
										isMulti={true}
										styles={selectOptionStyles}
									/>
								</InputContainer>
								{selectedNationality.length === 0 && <Error>Required</Error>}
								<InputContainer>
									<InputLabel>Spoken Languages</InputLabel>
									<Select
										options={languageOptions}
										defaultValue={selectedLangauge}
										onChange={setSelectedLangauge}
										isMulti={true}
										styles={selectOptionStyles}
									/>
								</InputContainer>
								{selectedLangauge.length === 0 && <Error>Required</Error>}
								<InputContainer>
									<InputLabel>Religion</InputLabel>
									<Select
										options={religionOptions}
										defaultValue={selectedReligion}
										onChange={setSelectedReligion}
										isMulti={true}
										styles={selectOptionStyles}
									/>
								</InputContainer>
								{selectedReligion.length === 0 && <Error>Required</Error>}
								<RadioContainer role="group" aria-labelledby="my-gender-group">
									<RadioLabel>
										<RadioInput type="radio" name="gender" value="true" /> practicing
									</RadioLabel>
									<RadioLabel>
										<RadioInput type="radio" name="gender" value="false" /> non-practicing
									</RadioLabel>
									{<Error>{!!touched.gender && !!errors.gender ? errors.gender : null}</Error>}
								</RadioContainer>
							</Grid>
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

export default ResidentForm;
