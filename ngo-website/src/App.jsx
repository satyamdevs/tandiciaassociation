import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Donate from "./pages/Donate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;