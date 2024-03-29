import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import Context from "./context/context";
import { mediaQueryMinWidth } from "./common/lib";
import Global from "./styles/global";
import Topbar from "./scenes/global/topbar";
import Sidebar from "./scenes/global/sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import ActivityNewForm from "./scenes/activity-new-form";
import Residents from "./scenes/residents";
import Resident from "./scenes/resident";
import ResidentAddForm from "./scenes/resident-add-form";
import ResidentSetActivities from "./scenes/resident-set-actitvities";
import ResidentEditActivities from "./scenes/resident-edit-activities";
import ResidentNew from "./scenes/resident-new";
import Faq from "./scenes/faq";
import Calendar from "./scenes/calendar";
import BarChart from "./scenes/bar-chart";
import AttendanceChart from "./scenes/attendence-chart";
import LineChart from "./scenes/line-chart";
import ActivityNewAttendance from "./scenes/activity-new-attendance";
import ActivityNewConfirmed from "./scenes/activity-new-confirmed";
import ActivityOrganisedView from "./scenes/activity-organised-view";
import TeamMember from "./scenes/team-member";

import adminApi from "./api/admin.api";

function App() {
	const [context, setContext] = useState({});
	const isDesktop = useMediaQuery(mediaQueryMinWidth);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { activities, residents, teamMembers, lastOrganisedActivities } = await adminApi.firstLoad();
				setContext({ ...context, activities, residents, teamMembers, lastOrganisedActivities });
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	return (
		<Context.Provider value={{ context, setContext }}>
			<Global />
			<div className="app">
				{isDesktop && <Sidebar />}
				<main className="content">
					<Topbar />
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/team" element={<Team />} />
						<Route path="/teamMember" element={<TeamMember />} />
						<Route path="/residents" element={<Residents />} />
						<Route path="/resident" element={<Resident />} />
						<Route path="/residentAddForm" element={<ResidentAddForm />} />
						<Route path="/residentSetActivities" element={<ResidentSetActivities />} />
						<Route path="/residentEditActivities" element={<ResidentEditActivities />} />
						<Route path="/residentNew" element={<ResidentNew />} />
						<Route path="/activityNewForm" element={<ActivityNewForm />} />
						<Route path="/activityNewAttendance" element={<ActivityNewAttendance />} />
						<Route path="/activityNewConfirmed" element={<ActivityNewConfirmed />} />
						<Route path="/activityOrganisedView" element={<ActivityOrganisedView />} />
						<Route path="/attendenceChart" element={<AttendanceChart />} />
						<Route path="/lineChart" element={<LineChart />} />
						{/* <Route path="/barChart" element={<BarChart />} /> */}
						<Route path="/faq" element={<Faq />} />
						<Route path="/calendar" element={<Calendar />} />
					</Routes>
				</main>
			</div>
		</Context.Provider>
	);
}

export default App;
