import { Routes, Route } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import { NAV } from './app/nav';
import { Home } from './pages/Home';
import { Placeholder } from './pages/Placeholder';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        {NAV.filter((n) => n.to !== '/').map((n) => (
          <Route key={n.to} path={n.to} element={<Placeholder title={n.label} />} />
        ))}
      </Route>
    </Routes>
  );
}
