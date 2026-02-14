import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SaturdaysPage from "./pages/SaturdaysPage";
import DictionariesPage from "./pages/DictionariesPage";
import SundaysPage from "./pages/SundaysPage";
import LessonPage from "./pages/LessonPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/saturdays" element={<SaturdaysPage />} />
        <Route path="/saturdays/:id" element={<LessonPage />} />
        <Route path="/dictionaries" element={<DictionariesPage />} />
        <Route path="/dictionaries/:id" element={<LessonPage />} />
        <Route path="/sundays" element={<SundaysPage />} />
        <Route path="/sundays/:id" element={<LessonPage />} />
      </Routes>
    </div>
  );
}
