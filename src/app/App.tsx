import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ExternalRedirect } from "./components/ExternalRedirect";
import { GIDA_AJANI_URL } from "./constants";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gida-radari" element={<ExternalRedirect to={GIDA_AJANI_URL} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
