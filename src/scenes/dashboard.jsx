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
import LoadingSpinner from "./components/LoadingSpinner";

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
const Dashboard = () => {
	const navigate = useNavigate();
	const { context, setContext } = useContext(Context);
	const { lastOrganisedActivities } = context;
	console.log("### lastOrganisedActivities", lastOrganisedActivities);
	const [organisedActivities, setOrganisedActivities] = useState(lastOrganisedActivities);
	const [selectedActivity, setSelectedActivity] = useState(null);
	const [sorting, setSorting] = useState([]);
	const [filtering, setFiltering] = useState("");

	useEffect(() => {
		setOrganisedActivities(lastOrganisedActivities);
	}, [lastOrganisedActivities]);

	const data = useMemo(() => {
		return organisedActivities;
	}, [organisedActivities]);

	const columns = [
		{ header: "Activity", accessorKey: "activityName", size: "200" },
		{
			header: "Date",
			accessorKey: "date",
			cell: (info) => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
		},
		{ header: "Attendees", accessorKey: "residentCount", size: "200" },
	];

	const handleClick = (rowOriginal) => {
		console.log("### rowOriginal", rowOriginal);
		setContext({ ...context, newActivityValues: rowOriginal });
		navigate("/activityOrganisedView");
	};

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Container>
			<PageHeading>Dashboard</PageHeading>
			{organisedActivities ? (
				<Table>
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<Th key={header.id}>
										<ThCell>{flexRender(header.column.columnDef.header, header.getContext())}</ThCell>
									</Th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} onClick={() => handleClick(row.original)}>
								{row.getVisibleCells().map((cell) => (
									<Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<LoadingSpinner />
			)}
		</Container>
	);
};

export default Dashboard;
