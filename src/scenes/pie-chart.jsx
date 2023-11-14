import styled from "@emotion/styled";
import { useContext } from "react";
import { PageHeading, Heading } from "../common/typography";
import MyResponsivePie from "./components/PieChart";
import Context from "../context/context";
import { colors } from "../styles/theme";

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

const PieChart = () => {
	const { context, setContext } = useContext(Context);
	const { selectedResident } = context;

	console.log("### selectedResident: ", selectedResident);

	return (
		<Container>
			<PageHeading>Pie Chart</PageHeading>
			<ResidentName>{selectedResident?.firstName || "John Doe"}</ResidentName>
			<MyResponsivePie />
		</Container>
	);
};

export default PieChart;
