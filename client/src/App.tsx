import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="text-3xl font-black text-rose">Nihongo Sensei</h1>} />
    </Routes>
  );
}
