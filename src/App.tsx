import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import "./App.css";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};
