import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Header/Navbar";
import AppFooter from "./components/Footer/Footer";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Outlet />
      <AppFooter />
    </div>
  );
}

export default App;
