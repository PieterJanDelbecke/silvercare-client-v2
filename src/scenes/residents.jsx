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
import residents from "../data/MOCK_DATA.json";
import { PageHeading } from "../common/typography";
import { colors } from "../styles/theme";
import { AiOutlineArrowLeft as ArrowLeftIcon } from "react-icons/ai";
import { AiOutlineArrowRight as ArrowRightIcon } from "react-icons/ai";
import { AiOutlineArrowUp as ArrowUpIcon } from "react-icons/ai";
import { AiOutlineArrowDown as ArrowDownIcon } from "react-icons/ai";
import SearchBar from "../common/searchBar";

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
	const { context, setContext } = useContext(Context);
	const navigate = useNavigate();

	const [sorting, setSorting] = useState([]);
	const [filtering, setFiltering] = useState("");
	const [selectedResident, setSelectedResident] = useState(null);

	useEffect(() => {
		setContext({ ...context, residents: residents });
	}, []);

	const data = useMemo(() => residents, []);

	/** @type import('@tanstack/react-table').ColumnDef<any> */

	const columns = [
		// { header: "ID", accessorKey: "id" },
		{ header: "First Name", accessorKey: "first_name", size: "200" },
		{ header: "Last Name", accessorKey: "last_name" },
		{ header: "Email", accessorKey: "email" },
		{ header: "Gender", accessorKey: "gender" },
		{
			header: "DOB",
			accessorKey: "dob",
			cell: (info) => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
		},
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting: sorting,
			globalFilter: filtering,
		},
		onSortingChange: setSorting,
		onGlobalFilterChange: setFiltering,
	});

	const handleClick = (rowId) => {
		const selectedRowId = +rowId + 1;
		const selected = residents.find((resident) => resident.id === selectedRowId);
		console.log("selected: ", selected.id);
		setSelectedResident(selected);
		setContext({ ...context, selectedResidentId: selected.id });
	};

	const handleView = () => {
		navigate("/resident");
	};

	return (
		<Container>
			<PageHeading>Residents</PageHeading>
			<TopContainer>
				<SearchBar value={filtering} onChange={(e) => setFiltering(e.target.value)} />
				{selectedResident && (
					<SelectedContainer>
						<SelectedText>
							{selectedResident.first_name} {selectedResident.last_name}
						</SelectedText>
						<ViewButton onClick={handleView}>View</ViewButton>
					</SelectedContainer>
				)}
			</TopContainer>
			<Table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<Th key={header.id} onClick={header.column.getToggleSortingHandler()}>
									<ThCell>
										{flexRender(header.column.columnDef.header, header.getContext())}
										{
											{
												asc: <ArrowUpIcon />,
												desc: <ArrowDownIcon />,
											}[header.column.getIsSorted() ?? null]
										}
									</ThCell>
								</Th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} onClick={() => handleClick(row.id)}>
							{row.getVisibleCells().map((cell) => (
								<Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
			<Footer>
				<div>
					{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</div>
				<Button onClick={() => table.setPageIndex(0)}>First Page</Button>
				<Button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
					<ArrowLeftIcon />
				</Button>
				<Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
					<ArrowRightIcon />
				</Button>
				<Button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</Button>
			</Footer>
		</Container>
	);
};

export default Residents;
