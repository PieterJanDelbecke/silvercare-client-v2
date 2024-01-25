import styled from "@emotion/styled";
import { useState, useContext, useEffect } from "react";
import { PageHeading, Heading } from "../common/typography";
import MyResponsivePie from "./components/PieChart";
import Context from "../context/context";
import { colors } from "../styles/theme";
import api from "../api/api";

import Select from "react-select";
import { mockPieData } from "../data/mockData";

import {
	// Container,
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

const Container = styled.div`
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	height: 60vh;
`;

const FormContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 400px;
`;

const ResidentName = styled(Heading)`
	color: ${colors.greenAccent[500]};
`;

const PieChart = () => {
	const { context, setContext } = useContext(Context);
	const { residents } = context;
	const [data, setData] = useState(mockPieData);
	console.log("### residents", residents);

	const residentsData = residents.map((resident) => {
		return {
			value: resident.id,
			label: `${resident.firstName} ${resident.lastName}`,
		};
	});
	const [selectedResident, setSelectedResident] = useState(residentsData[0]);

	const viewResident = async () => {
		try {
			const result = await api.getResidentPieChartData(selectedResident.id);
			console.log("result", result);
			setData(result);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container>
			<PageHeading>Pie Chart</PageHeading>
			<FormContainer>
				<div>
					<InputLabel>Select Resident</InputLabel>
					<Select
						options={residentsData}
						// defaultValue={selectedResident}
						onChange={setSelectedResident}
						styles={selectOptionStyles}
					/>
				</div>
				<ButtonContainer>
					<SubmitButton onClick={viewResident}>View</SubmitButton>
				</ButtonContainer>
			</FormContainer>
			<ResidentName>John Doe</ResidentName>
			<MyResponsivePie data={data} />
		</Container>
	);
};

export default PieChart;
