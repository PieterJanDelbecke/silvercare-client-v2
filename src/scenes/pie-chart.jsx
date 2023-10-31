import styled from "@emotion/styled";
import { useContext } from "react";

import Context from "../context/context";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 75vh;
`;

import MyResponsivePie from "./components/PieChart";

const PieChart = () => {
	const { context, setContext } = useContext(Context);
	const { selectedResidentId } = context;

	console.log("### selectedResidentId: ", selectedResidentId);

	return (
		<Container>
			Pie Chart
			<MyResponsivePie />
		</Container>
	);
};

export default PieChart;
