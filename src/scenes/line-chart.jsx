import styled from "@emotion/styled";
import { useContext } from "react";
import { PageHeading, Heading } from "../common/typography";

import Context from "../context/context";
import { colors } from "../styles/theme";
import MyLineChart from "./components/LineChart";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 75vh;
`;

const ResidentName = styled(Heading)`
	color: ${colors.greenAccent[500]};
`;

const LineChart = () => {
	const { context, setContext } = useContext(Context);
	const { selectedResident } = context;

	console.log("### selectedResident: ", selectedResident);

	return (
		<Container>
			<PageHeading>Line Chart</PageHeading>
			<ResidentName>{selectedResident?.firtName || "John Doe"}</ResidentName>
			<MyLineChart />
		</Container>
	);
};

export default LineChart;
