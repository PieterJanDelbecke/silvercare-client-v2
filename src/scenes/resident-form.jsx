import styled from "@emotion/styled";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { PageHeading } from "../common/typography";
import { colors } from "../styles/theme";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const InputsContainer = styled.div`
	margin: 20px;
	width: 100%;
`;

const Grid = styled.div`
	margin-left: 24px;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 24px;
`;

const InputContainer = styled.div`
	grid-column: 2 span;
`;

const Input = styled.input`
	border: 2px solid ${colors.blueAccent[500]};
	border-radius: 6px;
	padding: 4px;
	height: 40px;
	width: 100%;
`;

const Error = styled.p`
	font-size: 12px;
	color: red;
	margin-left: 8px;
	height: 16px;
`;

const SubmitButton = styled.button`
	margin-block: 16px;
	width: 160px;
	height: 36px;
	border-radius: 8px;
	background-color: ${colors.greenAccent[500]};
`;

const ResidentForm = () => {
	const handleFormSubmit = (values) => {
		console.log(values);
	};

	const initialValues = {
		firstName: "",
		lastName: "",
		email: "",
		dob: "",
	};

	const checkoutSchema = Yup.object().shape({
		firstName: Yup.string().required("required"),
		lastName: Yup.string().required("required"),
		email: Yup.string().email("Invalid email address").required("required"),
		dob: Yup.string().required("required"),
	});
	return (
		<Container>
			<PageHeading>Resident Form</PageHeading>
			<InputsContainer>
				<Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
					{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<Grid>
								<InputContainer>
									<Input
										type="text"
										name="firstName"
										id="firstName"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.firstName}
										placeholder="First Name"
									/>
									{!!touched.firstName && !!errors.firstName ? <Error>{errors.firstName}</Error> : <Error></Error>}
								</InputContainer>
								<InputContainer>
									<Input
										type="text"
										name="lastName"
										id="lastName"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.lastName}
										placeholder="Last Name"
									/>
									{!!touched.lastName && !!errors.lastName ? <Error>{errors.lastName}</Error> : null}
								</InputContainer>
								<InputContainer>
									<Input
										type="text"
										name="email"
										id="email"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.email}
										placeholder="Email"
									/>
									{!!touched.email && !!errors.email ? <Error>{errors.email}</Error> : null}
								</InputContainer>
								<InputContainer>
									<Input
										type="date"
										name="dob"
										id="dob"
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.dob}
										placeholder="DOB"
									/>
									{!!touched.dob && !!errors.dob ? <Error>{errors.dob}</Error> : null}
								</InputContainer>
							</Grid>
							<SubmitButton type="submit">Submit</SubmitButton>
						</form>
					)}
				</Formik>
			</InputsContainer>
		</Container>
	);
};

export default ResidentForm;
