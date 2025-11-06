import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import "./styles/App.css";

function App() {
  const isAuthenticated = true;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />}
          />

          <Route
            path="/"
            element={
              isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
