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

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: black;
	/* background-color: orange; */
`;

const Button = styled.button`
	margin: 12px;
	border: 1px solid red;
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
		state: {
			sorting: sorting,
		},
		onSortingChange: setSorting,
	});

	return (
		<Container>
			<PageHeading>Team</PageHeading>
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} onClick={header.column.getToggleSortingHandler()}>
									<div>
										{flexRender(header.column.columnDef.header, header.getContext())}
										{{ asc: "up", desc: "down" }[header.column.getIsSorted() ?? null]}
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<Button onClick={() => table.setPageIndex(0)}>First Page</Button>
				<Button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
					Previous
				</Button>
				<Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
					Next
				</Button>
				<Button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</Button>
			</div>
		</Container>
	);
};

export default Team;
