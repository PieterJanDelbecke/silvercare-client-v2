import styled from "@emotion/styled";
import { Formik, Field, Form } from "formik";
import { colors } from "../styles/theme";
import { PageHeading } from "./typography";

export const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const InputsContainer = styled.div`
	margin: 20px;
	width: 100%;
`;

export const Grid = styled.div`
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

export const InputContainer = styled.div`
	grid-column: 2 span;
`;

export const Input = styled.input`
	border-radius: 6px;
	padding-left: 14px;
	height: 40px;
	width: 100%;
	background-color: ${colors.grey[100]};
	:focus {
		outline: none;
	}
`;

export const InputLabel = styled.p`
	font-size: 12px;
	margin-left: 8px;
	height: 16px;
`;

export const Error = styled.p`
	font-size: 12px;
	color: red;
	margin-left: 8px;
	height: 16px;
`;

export const FormContainer = styled.div`
	display: flex;
	grid-column: 4 span;
	margin-block: 12px;
	padding-left: 12px;
`;

export const FormSpan = styled.span`
	min-width: 100px;
`;

export const FormLabel = styled.label`
	margin-left: 4px;
	min-width: 80px;
`;

export const FormInput = styled(Field)`
	transform: scale(1.5);
	margin-right: 5px;
`;

export const SubmitButton = styled.button`
	cursor: pointer;
	margin-block: 16px;
	width: 160px;
	height: 36px;
	border-radius: 8px;
	background-color: ${colors.greenAccent[500]};
	color: ${colors.primary[500]};
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-right: 36px;
`;

export const selectOptionStyles = {
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
