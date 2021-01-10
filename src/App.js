import React from "react";

// child components
import OfficeMap from "./components/OfficeMap";

// styles
import "./styles/app.css";

function App() {
  return (
    <div>
      <header className="app-header">
        <h1>Intuit North America Locations</h1>
      </header>
      <OfficeMap />
    </div>
  );
}

export default App;
