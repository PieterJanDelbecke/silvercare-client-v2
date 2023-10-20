import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as theme from "./styles/theme";
import Global from "./styles/global";
import Dashboard from "./scenes/dashboard";
import Topbar from "./scenes/global/topbar";
import Sidebar from "./scenes/global/sidebar";
import { useMediaQuery } from "@mui/material";

function App() {
	const isDesktop = useMediaQuery("(min-width:820px)");

	return (
		<ThemeProvider theme={theme}>
			<Global />
			<body className="app">
				{isDesktop && <Sidebar />}
				<main className="content">
					<Topbar />
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Dashboard />} />
						</Routes>
					</BrowserRouter>
				</main>
			</body>
		</ThemeProvider>
	);
}

export default App;
