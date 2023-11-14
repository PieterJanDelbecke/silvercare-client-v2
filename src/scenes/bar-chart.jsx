import styled from "@emotion/styled";
import { useContext } from "react";

import Context from "../context/context";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const BarChart = () => {
	const { context, setContext } = useContext(Context);
	const { selectedResidentId } = context;

	console.log("### selectedResidentId: ", selectedResidentId);

	return <Container>BarChart</Container>;
};

export default BarChart;
