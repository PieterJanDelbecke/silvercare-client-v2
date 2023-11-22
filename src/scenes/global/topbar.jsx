import styled from "@emotion/styled";

import { colors } from "../../styles/theme";
import IconButton from "../../common/iconButtons";
import { useMediaQuery } from "@mui/material";
import { mediaQueryMinWidth } from "../../common/lib";

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 16px;
	background-color: ${colors.primary[500]};
	height: 60px;
`;

const IconsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 24px;
`;

const Topbar = () => {
	const isDesktop = useMediaQuery(mediaQueryMinWidth);

	const user = () => {
		console.log("USER");
	};
	const settings = () => {
		console.log("SETTINGS");
	};
	const menu = () => {
		console.log("MENU");
	};
	return (
		<Container>
			{!isDesktop ? <IconButton name={"menu"} onClick={user} /> : <div></div>}
			<IconsContainer>
				<IconButton name={"settings"} onClick={settings} />
				<IconButton name={"user"} onClick={menu} />
			</IconsContainer>
		</Container>
	);
};

export default Topbar;
