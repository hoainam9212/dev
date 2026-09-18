import { Routes, Route } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import { NAV } from './app/nav';
import { Home } from './pages/Home';
import { Placeholder } from './pages/Placeholder';
import { KanaPage } from './pages/kana/KanaPage';
import { VocabPage } from './pages/vocab/VocabPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/kana" element={<KanaPage />} />
        <Route path="/vocab" element={<VocabPage />} />
        {NAV.filter((n) => !['/', '/kana', '/vocab'].includes(n.to)).map((n) => (
          <Route key={n.to} path={n.to} element={<Placeholder title={n.label} />} />
        ))}
      </Route>
    </Routes>
  );
}
