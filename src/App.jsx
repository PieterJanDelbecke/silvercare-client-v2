import { ThemeProvider } from "@emotion/react";
import { Routes, Route } from "react-router-dom";

import { useMediaQuery } from "@mui/material";
import * as theme from "./styles/theme";
import Global from "./styles/global";
import Topbar from "./scenes/global/topbar";
import Sidebar from "./scenes/global/sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Residents from "./scenes/residents";
import ResidentForm from "./scenes/resident-form";
import Faq from "./scenes/faq";
import Calendar from "./scenes/calendar";
import BarChart from "./scenes/bar-chart";

function App() {
	const isDesktop = useMediaQuery("(min-width: 1200px)");

	return (
		<ThemeProvider theme={theme}>
			<Global />
			<div className="app">
				{isDesktop && <Sidebar />}
				<main className="content">
					<Topbar />
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/team" element={<Team />} />
						<Route path="/residents" element={<Residents />} />
						<Route path="/barChart" element={<BarChart />} />
						<Route path="/residentForm" element={<ResidentForm />} />
						<Route path="/faq" element={<Faq />} />
						<Route path="/calendar" element={<Calendar />} />
					</Routes>
				</main>
			</div>
		</ThemeProvider>
	);
}

export default App;
