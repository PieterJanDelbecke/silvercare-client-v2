import { useState, useContext } from "react";
import Context from "../context/context";
import PeopleTable from "./components/PeopleTable";

const Team = () => {
	const { context, setContext } = useContext(Context);
	const { teamMembers: initialTeamMembers } = context;
	const [people, setPeople] = useState(initialTeamMembers);
	const [selectedPerson, setSelectedPerson] = useState(null);

	/** @type import('@tanstack/react-table').ColumnDef<any> */

	const columns = [
		{ header: "First Name", accessorKey: "firstName", size: "200" },
		{ header: "Last Name", accessorKey: "lastName" },
		{ header: "Role", accessorKey: "role" },
	];

	const handleClick = (clickedPerson) => {
		setSelectedPerson(clickedPerson);
		setContext({ ...context, selectedTeamMember: clickedPerson });
	};

	return (
		<PeopleTable
			title={"Team"}
			columns={columns}
			navigateRoute={"/teamMember"}
			people={people}
			selectedPerson={selectedPerson}
			handleClick={handleClick}
		/>
	);
};

export default Team;
