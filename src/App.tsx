import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { RouteEffects } from "./components/navigation/RouteEffects";
import { PageActions } from "./components/navigation/PageActions";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { NotFound } from "./pages/not-found/NotFound";
import { RouteMetadata } from "./components/RouteMetadata";
import "./App.css";

export const App = () => <Router><Navbar /><main id="main-content" tabIndex={-1}><ErrorBoundary><Routes><Route path="/" element={<Home />} /><Route path="*" element={<NotFound />} /></Routes></ErrorBoundary></main><Footer /><RouteEffects /><RouteMetadata /><PageActions /></Router>;
