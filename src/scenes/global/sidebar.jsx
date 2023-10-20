import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { colors } from "../../styles/theme";
import { AiOutlineHome as HomeIcon } from "react-icons/ai";
import IconButton from "../../common/icons";

import styled from "@emotion/styled";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 240px;
	height: 100vh;
	border: 1px solid red;
`;

const AdminDiv = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Paragraph = styled.p`
	font-size: 12px;
	color: ${colors.grey[100]};
`;

const Sidebar = () => {
	const [selected, setSelected] = useState("dashboard");
	const [isCollapsed, setIsCollapsed] = useState(false);

	return <Container></Container>;
};

export default Sidebar;
