import { Link, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Spinner, ThemeToggle } from "./components";
// import Dashboard from "./pages/Dashboard/Dashboard";
import { changeLanguage } from "./lang";
// import Settings from "./pages/Settings/Settings";
import { Suspense, lazy, useEffect } from "react";
// import Testing_1 from "./pages/Testing/Testing_1";
import { useSelector } from "react-redux";
import Alert from "components/Alert/Alert";
import { Error401, Error404 } from "./pages/errors";
import Login from "pages/Login/Login";
import Welcome from "pages/Welcome/Welcome";

const DashboardRouter = lazy(() =>
  import("./pages/DashboardRouter/DashboardRouter")
);

function App() {
  const { role } = useSelector((state) => state.auth);

  return (
    <Suspense fallback={<Spinner page />}>
      <Routes>
        <Route path="/" element={<Welcome />} />

        {role === "admin" || role === "SUPER_admin" || role === "employee" ? (
          <Route path="/dashboard/*" element={<DashboardRouter />} />
        ) : null}

        <Route path="/login" element={<Login />} />
        <Route
          path="/unauthorized"
          element={<Error401 navigateTo={"/"} timer={10000} />}
        />
        <Route path="*" element={<Error404 navigateTo={"/"} timer={10000} />} />
      </Routes>
      <Alert />
    </Suspense>
  );
}

export default App;
