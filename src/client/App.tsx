import React from "react";

import Dashboard from "./pages/Dashboard";
import Brokers from "./pages/Brokers";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      {/* Hello, this is a new App */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/brokers" element={<Brokers />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
