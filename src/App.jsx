import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as theme from "./styles/theme";
import Global from "./styles/global";
import Dashboard from "./scenes/dashboard";
import Topbar from "./scenes/global/topbar";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Topbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
