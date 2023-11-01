import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Context from "./context/context";
import { useMediaQuery } from "@mui/material";
import Global from "./styles/global";
import Topbar from "./scenes/global/topbar";
import Sidebar from "./scenes/global/sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Residents from "./scenes/residents";
import Resident from "./scenes/resident";
import ResidentForm from "./scenes/resident-form";
import Faq from "./scenes/faq";
import Calendar from "./scenes/calendar";
import BarChart from "./scenes/bar-chart";
import PieChart from "./scenes/pie-chart";

function App() {
	const [context, setContext] = useState({});
	const isDesktop = useMediaQuery("(min-width: 1200px)");

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
						{/* <Route path="/barChart" element={<BarChart />} /> */}
						<Route path="/pieChart" element={<PieChart />} />
						<Route path="/residentForm" element={<ResidentForm />} />
						<Route path="/faq" element={<Faq />} />
						<Route path="/calendar" element={<Calendar />} />
					</Routes>
				</main>
			</div>
		</Context.Provider>
	);
}

export default App;
