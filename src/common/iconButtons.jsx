import { BaseButton } from "./buttons";
import { AiOutlineHome as HomeIcon } from "react-icons/ai";
import { AiOutlineTeam as TeamIcon } from "react-icons/ai";
import { AiOutlineUser as UserIcon } from "react-icons/ai";
import { AiOutlineSetting as SettingsIcon } from "react-icons/ai";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import { AiOutlineMenu as MenuIcon } from "react-icons/ai";
import { AiOutlineBarChart as BarChartIcon } from "react-icons/ai";
import { AiOutlineLineChart as LineChartIcon } from "react-icons/ai";
import { AiOutlinePieChart as PieChartIcon } from "react-icons/ai";
import { AiOutlineCalendar as CalendarIcon } from "react-icons/ai";
import { AiOutlineQuestionCircle as FaqIcon } from "react-icons/ai";
import { AiOutlineForm as FormIcon } from "react-icons/ai";
import { AiOutlineArrowLeft as ArrowLeftIcon } from "react-icons/ai";
import { AiOutlineArrowRight as ArrowRightIcon } from "react-icons/ai";
import { AiOutlineArrowUp as ArrowUpIcon } from "react-icons/ai";
import { AiOutlineArrowDown as ArrowDownIcon } from "react-icons/ai";

import { colors } from "../styles/theme";

const IconButton = ({ name, onClick, size, color }) => {
	const iconStyle = {
		fontSize: size || 28,
		color: color || colors.grey[100],
	};

	switch (name) {
		case "home":
			return (
				<BaseButton onClick={onClick}>
					<HomeIcon style={iconStyle} />
				</BaseButton>
			);
		case "team":
			return (
				<BaseButton onClick={onClick}>
					<TeamIcon style={iconStyle} />
				</BaseButton>
			);
		case "user":
			return (
				<BaseButton onClick={onClick}>
					<UserIcon style={iconStyle} />
				</BaseButton>
			);
		case "settings":
			return (
				<BaseButton onClick={onClick}>
					<SettingsIcon style={iconStyle} />
				</BaseButton>
			);
		case "search":
			return (
				<BaseButton onClick={onClick}>
					<SearchIcon style={iconStyle} />
				</BaseButton>
			);
		case "menu":
			return (
				<BaseButton onClick={onClick}>
					<MenuIcon style={iconStyle} />
				</BaseButton>
			);
		case "barChart":
			return (
				<BaseButton onClick={onClick}>
					<BarChartIcon style={iconStyle} />
				</BaseButton>
			);
		case "lineChart":
			return (
				<BaseButton onClick={onClick}>
					<LineChartIcon style={iconStyle} />
				</BaseButton>
			);
		case "pieChart":
			return (
				<BaseButton onClick={onClick}>
					<PieChartIcon style={iconStyle} />
				</BaseButton>
			);
		case "calendar":
			return (
				<BaseButton onClick={onClick}>
					<CalendarIcon style={iconStyle} />
				</BaseButton>
			);
		case "faq":
			return (
				<BaseButton onClick={onClick}>
					<FaqIcon style={iconStyle} />
				</BaseButton>
			);
		case "form":
			return (
				<BaseButton onClick={onClick}>
					<FormIcon style={iconStyle} />
				</BaseButton>
			);
		case "arrowLeft":
			return (
				<BaseButton onClick={onClick}>
					<ArrowLeftIcon style={iconStyle} />
				</BaseButton>
			);
		case "arrowRight":
			return (
				<BaseButton onClick={onClick}>
					<ArrowRightIcon style={iconStyle} />
				</BaseButton>
			);
		default:
			return <BaseButton onClick={onClick}></BaseButton>;
	}
};

export default IconButton;
