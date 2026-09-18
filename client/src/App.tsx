import { Routes, Route } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import { NAV } from './app/nav';
import { Placeholder } from './pages/Placeholder';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<h1 className="text-3xl font-black text-rose">Nihongo Sensei</h1>} />
        {NAV.filter((n) => n.to !== '/').map((n) => (
          <Route key={n.to} path={n.to} element={<Placeholder title={n.label} />} />
        ))}
      </Route>
    </Routes>
  );
}
