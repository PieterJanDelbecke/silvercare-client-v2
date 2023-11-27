import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Context from "./context/context";
import { useMediaQuery } from "@mui/material";
import { mediaQueryMinWidth } from "./common/lib";
import Global from "./styles/global";
import Topbar from "./scenes/global/topbar";
import Sidebar from "./scenes/global/sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Residents from "./scenes/residents";
import Resident from "./scenes/resident";
import ResidentAddForm from "./scenes/resident-add-form";
import ResidentNew from "./scenes/resident-new";
import Faq from "./scenes/faq";
import Calendar from "./scenes/calendar";
import BarChart from "./scenes/bar-chart";
import PieChart from "./scenes/pie-chart";
import LineChart from "./scenes/line-chart";

function App() {
	const [context, setContext] = useState({});
	const isDesktop = useMediaQuery(mediaQueryMinWidth);

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
						<Route path="/residents" element={<Residents />} />
						<Route path="/resident" element={<Resident />} />
						<Route path="/residentAddForm" element={<ResidentAddForm />} />
						<Route path="/residentNew" element={<ResidentNew />} />
						{/* <Route path="/barChart" element={<BarChart />} /> */}
						<Route path="/pieChart" element={<PieChart />} />
						<Route path="/lineChart" element={<LineChart />} />
						<Route path="/faq" element={<Faq />} />
						<Route path="/calendar" element={<Calendar />} />
					</Routes>
				</main>
			</div>
		</Context.Provider>
	);
}

export default App;
