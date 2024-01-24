import styled from "@emotion/styled";
import { Formik, Field, Form } from "formik";

import { PageHeading, Subheading } from "./typography";
import { colors } from "../styles/theme";

export const Container = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const InputsContainer = styled.div`
	width: ${(props) => (props.isDesktop ? "80%" : "100%")};
	padding-left: 24px;
`;

export const ResidentName = styled(Subheading)`
	padding-bottom: 8px;
	padding-left: 24px;
	color: ${colors.greenAccent[500]};
`;

export const FormContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-block: 12px;
	padding-left: 12px;
`;

export const FormSpan = styled.span`
	width: ${(props) => (props.isDesktop ? "30%" : "45%")};
	margin: 6px;
`;

export const FormLabel = styled.label`
	margin-left: 4px;
	min-width: 80px;
`;

export const FormInput = styled(Field)`
	transform: scale(1.5);
	margin-right: 5px;
`;

export const Error = styled.p`
	font-size: 12px;
	color: red;
	margin-left: 8px;
	height: 16px;
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
	justify-content: center;
	padding-right: 36px;
`;
