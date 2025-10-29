import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "../pages/main";
import { GuestPanel } from "../pages/guest-panel";


export const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:nome" element={<Main />} />
            <Route path="/painel-convidados-12345" element={<GuestPanel />} />
        </Routes>
    </BrowserRouter>
);