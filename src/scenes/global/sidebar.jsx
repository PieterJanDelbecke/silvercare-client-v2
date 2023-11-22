import { useState } from "react";
import styled from "@emotion/styled";

import { colors } from "../../styles/theme";
import { Heading, Subheading, Body } from "../../common/typography";
import IconButton from "../../common/iconButtons";

import { Link } from "react-router-dom";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 270px;
	height: 100vh;
	background-color: ${colors.primary[400]};
`;

const UserContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-block: 12px;
`;

const Name = styled(Heading)`
	color: #fff;
`;

const Role = styled(Subheading)`
	color: ${colors.greenAccent[500]};
`;

const OptionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 12px 24px;
	gap: 8px;
`;

const OptionContainer = styled(Link)`
	display: flex;
	align-items: center;
	gap: 16px;
`;
const Title = styled(Body)`
	${(props) => `color: ${props.color}`}
`;

const Option = ({ title, to, iconName, selected, setSelected }) => {
	const color = selected === title ? colors.blueAccent[500] : colors.grey[100];

	return (
		<OptionContainer to={to} onClick={() => setSelected(title)}>
			<IconButton name={iconName} color={color} />
			<Title color={color}>{title}</Title>
		</OptionContainer>
	);
};

const Sidebar = () => {
	const [selected, setSelected] = useState("Dashboard");

	return (
		<Container>
			<UserContainer>
				<Name>Pieter Delbecke</Name>
				<Role>CEO Silvercare</Role>
			</UserContainer>
			<OptionsContainer>
				<Option title="Dashboard" to="/" iconName="home" selected={selected} setSelected={setSelected} />
				<Option title="Team" to="/team" iconName="team" selected={selected} setSelected={setSelected} />
				<Option title="Residents" to="/residents" iconName="user" selected={selected} setSelected={setSelected} />
				<Option title="Pie Chart" to="/pieChart" iconName="barChart" selected={selected} setSelected={setSelected} />
				<Option title="Line Chart" to="/lineChart" iconName="barChart" selected={selected} setSelected={setSelected} />
				<Option title="Add Resident" to="/residentForm" iconName="form" selected={selected} setSelected={setSelected} />
				<Option title="Calendar" to="/calendar" iconName="calendar" selected={selected} setSelected={setSelected} />
				<Option title="FAQ" to="/faq" iconName="faq" selected={selected} setSelected={setSelected} />
			</OptionsContainer>
		</Container>
	);
};

export default Sidebar;
