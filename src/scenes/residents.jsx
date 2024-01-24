import { useState, useContext } from "react";
import { DateTime } from "luxon";

import Context from "../context/context";
import PeopleTable from "./components/PeopleTable";

const Residents = () => {
	const { context, setContext } = useContext(Context);
	const { residents: initialResidents } = context;
	const [people, setPeople] = useState(initialResidents);
	const [selectedPerson, setSelectedPerson] = useState(null);

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

	const handleClick = (clickedPerson) => {
		setSelectedPerson(clickedPerson);
		setContext({ ...context, selectedResident: clickedPerson });
	};

	return (
		<PeopleTable
			title={"Residents"}
			initialResidents={initialResidents}
			columns={columns}
			navigateRoute={"/resident"}
			people={people}
			setPeople={setPeople}
			selectedPerson={selectedPerson}
			setSelectedPerson={setSelectedPerson}
			handleClick={handleClick}
		/>
	);
};

export default Residents;
