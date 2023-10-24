import styled from "@emotion/styled";
import { useState, useMemo } from "react";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { DateTime } from "luxon";

import residents from "../data/MOCK_DATA.json";
import { PageHeading } from "../common/typography";
import { colors } from "../styles/theme";
import { AiOutlineArrowLeft as ArrowLeftIcon } from "react-icons/ai";
import { AiOutlineArrowRight as ArrowRightIcon } from "react-icons/ai";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: ${colors.grey[100]};
	background-color: ${colors.primary[500]};
	height: calc(100vh - 60px);
`;

const SearchInput = styled.input`
	margin: 12px;
	border: 1px solid red;
`;

const Table = styled.table`
	cursor: pointer;
	border-collapse: collapse;
	width: 1200px;
`;

const Td = styled.td`
	/* border: 1px solid #ddd; */
	padding: 8px;
`;

const Th = styled.th`
	/* border: 1px solid #ddd; */
	padding: 8px;

	padding-top: 12px;
	padding-bottom: 12px;
	text-align: left;
	background-color: ${colors.blueAccent[500]};
	color: white;

	& :first-of-type {
		border-top-left-radius: 12px;
	}
`;

const Tr = styled.tr`
	/* & :hover {
		background-color: #ddd;
	} */

	/* & :nth-child(even) {
		background-color: #f2f2f2;
	} */
`;

const Footer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 1200px;
	background-color: ${colors.blueAccent[500]};
	margin-top: 4px;
	gap: 6px;
`;

const Button = styled.button`
	margin: 8px;
	padding: 4px;
	border-radius: 4px;
	cursor: pointer;
`;

const Team = () => {
	const [sorting, setSorting] = useState([]);
	const [filtering, setFiltering] = useState("");

	const data = useMemo(() => residents, []);

	/** @type import('@tanstack/react-table').ColumnDef<any> */

	const columns = [
		{ header: "ID", accessorKey: "id" },
		{ header: "First Name", accessorKey: "first_name" },
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
		console.log("ROW ID", +rowId + 1);
		const selectedRowId = +rowId + 1;
		const selected = residents.find((resident) => resident.id === selectedRowId);
		console.log("SELECTED", selected);
	};

	return (
		<Container>
			<PageHeading>Team</PageHeading>
			<SearchInput type="text" value={filtering} onChange={(e) => setFiltering(e.target.value)} />
			<Table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<Tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<Th key={header.id} onClick={header.column.getToggleSortingHandler()}>
									<div>
										{flexRender(header.column.columnDef.header, header.getContext())}
										{{ asc: "🔼", desc: "🔽" }[header.column.getIsSorted() ?? null]}
									</div>
								</Th>
							))}
						</Tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<Tr key={row.id} onClick={() => handleClick(row.id)}>
							{row.getVisibleCells().map((cell) => (
								<Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
							))}
						</Tr>
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

export default Team;
