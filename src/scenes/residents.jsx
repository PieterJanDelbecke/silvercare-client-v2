import styled from "@emotion/styled";
import { useState, useMemo, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { DateTime } from "luxon";

import Context from "../context/context";
import api from "../api/api";
import { PageHeading } from "../common/typography";
import { colors } from "../styles/theme";
import { AiOutlineArrowLeft as ArrowLeftIcon } from "react-icons/ai";
import { AiOutlineArrowRight as ArrowRightIcon } from "react-icons/ai";
import { AiOutlineArrowUp as ArrowUpIcon } from "react-icons/ai";
import { AiOutlineArrowDown as ArrowDownIcon } from "react-icons/ai";
import SearchBar from "../common/searchBar";
import PeopleTable from "./PeopleTable";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-inline: auto;
	width: 1200px;
	@media (max-width: 1200px) {
		width: 750px;
	}
`;

const TopContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 18px;
`;

const Table = styled.table`
	cursor: pointer;
	border-collapse: collapse;
	width: 100%;
`;

const Td = styled.td`
	padding: 8px;
`;

const Th = styled.th`
	padding: 12px 8px;
	text-align: left;
	background-color: ${colors.blueAccent[500]};
	color: white;
`;

const ThCell = styled.div`
	display: flex;
	gap: 12px;
`;

const Footer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	background-color: ${colors.blueAccent[500]};
	margin-top: 4px;
	gap: 6px;
`;

const Button = styled.button`
	cursor: pointer;
	margin: 6px;
	padding: 6px;
	display: flex;
	align-items: center;
`;

const SelectedContainer = styled.div`
	display: flex;
	flex-direction: row;
	min-width: 200px;
	justify-content: space-between;
	align-items: center;
`;

const SelectedText = styled.div`
	color: ${colors.greenAccent[500]};
`;

const ViewButton = styled(Button)`
	border: 1px solid ${colors.grey[100]};
	border-radius: 8px;
`;

const Residents = () => {
	const navigate = useNavigate();
	const { context, setContext } = useContext(Context);
	const { residents: initialResidents } = context;

	/** @type import('@tanstack/react-table').ColumnDef<any> */

	const columns = [
		{ header: "First Name", accessorKey: "firstName", size: "200" },
		{ header: "Last Name", accessorKey: "lastName" },
		{
			header: "DOB",
			accessorKey: "dob",
			cell: (info) => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
		},
		{ header: "Gender", accessorKey: "gender" },
	];

	return (
		<PeopleTable
			title={"Residents"}
			initialResidents={initialResidents}
			columns={columns}
			navigateRoute={"/resident"}
		/>
	);
};

export default Residents;
