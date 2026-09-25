import { Routes, Route } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import { useSyncHtmlLang } from './i18n';
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
import { BusinessPage } from './pages/business/BusinessPage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';

export default function App() {
  useSyncHtmlLang();
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
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/login" element={<LoginPage mode="login" />} />
        <Route path="/register" element={<LoginPage mode="register" />} />
        <Route path="*" element={<Placeholder title="Không tìm thấy trang" />} />
      </Route>
    </Routes>
  );
}
