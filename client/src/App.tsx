import { Routes, Route } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import { NAV } from './app/nav';
import { Home } from './pages/Home';
import { Placeholder } from './pages/Placeholder';
import { KanaPage } from './pages/kana/KanaPage';
import { VocabPage } from './pages/vocab/VocabPage';
import { KanjiPage } from './pages/kanji/KanjiPage';
import { ReviewPage } from './pages/ReviewPage';
import { GrammarPage } from './pages/grammar/GrammarPage';
import { ReadingPage } from './pages/reading/ReadingPage';
import { ListeningPage } from './pages/listening/ListeningPage';
import { SpeakingPage } from './pages/speaking/SpeakingPage';
import { WritingPage } from './pages/writing/WritingPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/kana" element={<KanaPage />} />
        <Route path="/vocab" element={<VocabPage />} />
        <Route path="/kanji" element={<KanjiPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/grammar" element={<GrammarPage />} />
        <Route path="/reading" element={<ReadingPage />} />
        <Route path="/listening" element={<ListeningPage />} />
        <Route path="/speaking" element={<SpeakingPage />} />
        <Route path="/writing" element={<WritingPage />} />
        {NAV.filter((n) => !['/', '/kana', '/vocab', '/kanji', '/review', '/grammar', '/reading', '/listening', '/speaking', '/writing'].includes(n.to)).map((n) => (
          <Route key={n.to} path={n.to} element={<Placeholder title={n.label} />} />
        ))}
      </Route>
    </Routes>
  );
}
