import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import History from "./pages/History";


function App() {

  return (

    <BrowserRouter>

      <Sidebar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/history"
          element={<History />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;