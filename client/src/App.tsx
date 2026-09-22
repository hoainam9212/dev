import type { ReactNode } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { ProfileProvider, useProfile } from './db/profile';
import { AppShell } from './app/AppShell';
import { ErrorBoundary } from './app/ErrorBoundary';
import { WelcomePage } from './pages/WelcomePage';
import { ProfilePicker } from './profiles/ProfilePicker';
import { HomePage } from './pages/HomePage';
import { LessonPage } from './pages/LessonPage';
import { SettingsPage } from './pages/SettingsPage';
import { TypingHubPage } from './pages/TypingHubPage';
import { SpeedTestPage } from './pages/SpeedTestPage';
import { FishGamePage } from './pages/FishGamePage';
// Trang thử tạm của giai đoạn 5A — Task 11 xoá cả import này lẫn route /dev/ppt.
import { DevPptPage } from './pages/DevPptPage';
import { Mochi } from './components/Mochi';
import { HelpButton } from './help/HelpButton';
import { HelpDrawer } from './help/HelpDrawer';
import { HelpTooltipLayer } from './help/HelpTooltipLayer';

function RequireProfile({ children }: { children: ReactNode }) {
  const profile = useProfile();
  if (profile === undefined) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Mochi mood="sleepy" size={120} />
      </div>
    );
  }
  if (profile === null) return <Navigate to="/who" replace />;
  return <>{children}</>;
}

function LessonRoute() {
  const { id = '' } = useParams();
  return <LessonPage key={id} id={id} />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ProfileProvider>
        <Routes>
          <Route path="/who" element={<ProfilePicker />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route element={<RequireProfile><AppShell /></RequireProfile>}>
            <Route index element={<HomePage />} />
            <Route path="/lesson/:id" element={<LessonRoute />} />
            <Route path="/typing" element={<TypingHubPage />} />
            <Route path="/typing/test/:min" element={<SpeedTestPage />} />
            <Route path="/typing/fish" element={<FishGamePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="/dev/ppt" element={<DevPptPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <HelpButton />
        <HelpDrawer />
        <HelpTooltipLayer />
      </ProfileProvider>
    </ErrorBoundary>
  );
}
