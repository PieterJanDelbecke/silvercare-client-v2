import styled from "@emotion/styled";
import { mockDataTeam } from "../data/mockData";
import { useEffect } from "react";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Team = () => {
	console.log("DATA", mockDataTeam);
	return <Container>Team2</Container>;
};

export default Team;
