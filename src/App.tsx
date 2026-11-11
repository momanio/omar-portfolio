import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { RouteEffects } from "./components/navigation/RouteEffects";
import { PageActions } from "./components/navigation/PageActions";
import "./App.css";

export const App = () => <Router><Navbar /><main id="main-content" tabIndex={-1}><Routes><Route path="/" element={<Home />} /></Routes></main><Footer /><RouteEffects /><PageActions /></Router>;
