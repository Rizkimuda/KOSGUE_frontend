import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import Terms from "./pages/Terms";
import AdminDashboard from "./pages/AdminDashboard";
import KosForm from "./pages/KosForm";
import AllKos from "./pages/AllKos";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/kos/:slug" element={<Detail />} />
        <Route path="/all-kos" element={<AllKos />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/kos/new" element={<KosForm />} />
        <Route path="/admin/kos/edit/:slug" element={<KosForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
