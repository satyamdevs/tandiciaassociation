import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import Engagements from "./pages/Engagements";
import CampDetail from "./pages/CampDetail";
import Associations from "./pages/Associations";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/engagements" element={<Engagements />} />
        <Route path="/engagements/:campName" element={<CampDetail />} />
        <Route path="/associations" element={<Associations />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;