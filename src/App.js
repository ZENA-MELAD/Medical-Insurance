import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Spinner } from "./components";
import { Suspense, lazy } from "react";
import Alert from "./components/Alert/Alert";
import { Error401, Error404 } from "./pages/errors";
import Login from "./pages/Login/Login";
import Welcome from "./pages/Welcome/Welcome";

const DashboardRouter = lazy(() =>
  import("./pages/DashboardRouter/DashboardRouter")
);

function App() {
  return (
    <Suspense fallback={<Spinner page />}>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard/*" element={<DashboardRouter />} />

        <Route
          path="/unauthorized"
          element={<Error401 navigateTo="/" timer={10000} />}
        />

        <Route
          path="*"
          element={<Error404 navigateTo="/" timer={10000} />}
        />
      </Routes>

      <Alert />
    </Suspense>
  );
}

export default App;