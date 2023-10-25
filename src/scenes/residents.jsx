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
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import { useMediaQuery } from "@mui/material";

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

const SearchContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const SearchBar = styled.div`
	border-radius: 4px;
	background-color: ${colors.primary[400]};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right: 8px;
	margin-bottom: 24px;
`;

const SearchInput = styled.input`
	color: ${colors.grey[100]};
	background-color: ${colors.primary[400]};
	margin: 12px;
	:focus {
		outline: none;
	}
`;

const Table = styled.table`
	cursor: pointer;
	border-collapse: collapse;
	width: 100%;
`;

const Td = styled.td`
	/* border: 1px solid #ddd; */
	padding: 8px;
`;

const Th = styled.th`
	padding: 12px 8px;
	text-align: left;
	background-color: ${colors.blueAccent[500]};
	color: white;
	/* min-width: 200px; */
`;

const Tr = styled.tr``;

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
	const [sorting, setSorting] = useState([]);
	const [filtering, setFiltering] = useState("");
	const [selectedResident, setSelectedResident] = useState(null);

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
		setSelectedResident(selected);
		console.log("SELECTED", selected);
	};

	return (
		<Container>
			<PageHeading>Residents</PageHeading>
			<SearchContainer>
				<SearchBar>
					<SearchInput
						type="text"
						value={filtering}
						onChange={(e) => setFiltering(e.target.value)}
						placeholder="Search"
					/>
					<SearchIcon style={{ fontSize: "24px" }} />
				</SearchBar>
				{selectedResident && (
					<SelectedContainer>
						<SelectedText>
							{selectedResident.first_name} {selectedResident.last_name}
						</SelectedText>
						<ViewButton>View</ViewButton>
					</SelectedContainer>
				)}
			</SearchContainer>
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

export default Residents;
