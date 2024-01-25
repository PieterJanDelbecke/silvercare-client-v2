import styled from "@emotion/styled";
import { useState, useContext, useEffect } from "react";
import { PageHeading, Heading, Body } from "../common/typography";
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
	margin-block: 20px;
	width: 480px;
`;

const Text = styled(Body)`
	color: ${colors.greenAccent[500]};
`;

const AttendanceChart = () => {
	const { context, setContext } = useContext(Context);
	const { residents } = context;
	const [data, setData] = useState(mockPieData);

	const residentsData = residents.map((resident) => {
		return {
			value: resident.id,
			label: `${resident.firstName} ${resident.lastName}`,
		};
	});
	const [selectedResident, setSelectedResident] = useState(null);

	useEffect(() => {
		const getChartData = async () => {
			try {
				const result = await api.getResidentAttendenceData(selectedResident.value);
				setData(result);
			} catch (error) {
				console.error(error);
			}
		};
		if (selectedResident) {
			getChartData();
		}
	}, [selectedResident]);

	return (
		<Container>
			<PageHeading>Attendence Chart</PageHeading>
			<Text>last 30 days</Text>
			<FormContainer>
				<InputLabel>Resident</InputLabel>
				<Select options={residentsData} onChange={setSelectedResident} styles={selectOptionStyles} />
			</FormContainer>
			{selectedResident && <MyResponsivePie data={data} />}
		</Container>
	);
};

export default AttendanceChart;
