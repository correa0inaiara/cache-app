import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Desafio01 from "./pages/Desafio01";
import Desafio02 from "./pages/Desafio02";
import App from "./App";
import './index.css'

const root = document.getElementById("root");
ReactDOM.createRoot(root!).render(
    <BrowserRouter>
      
      <Routes>
        <Route index element={<App />} />
        <Route path="/desafio01" element={<Desafio01 />} />
        <Route path="/desafio02" element={<Desafio02 />} />
      </Routes>

    </BrowserRouter>,
  );