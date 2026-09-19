import type { ReactNode } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { ProfileProvider, useProfile } from './db/profile';
import { AppShell } from './app/AppShell';
import { ErrorBoundary } from './app/ErrorBoundary';
import { WelcomePage } from './pages/WelcomePage';
import { HomePage } from './pages/HomePage';
import { LessonPage } from './pages/LessonPage';
import { SettingsPage } from './pages/SettingsPage';
import { Mochi } from './components/Mochi';

function RequireProfile({ children }: { children: ReactNode }) {
  const profile = useProfile();
  if (profile === undefined) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Mochi mood="sleepy" size={120} />
      </div>
    );
  }
  if (profile === null) return <Navigate to="/welcome" replace />;
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
          <Route path="/welcome" element={<WelcomePage />} />
          <Route element={<RequireProfile><AppShell /></RequireProfile>}>
            <Route index element={<HomePage />} />
            <Route path="/lesson/:id" element={<LessonRoute />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ProfileProvider>
    </ErrorBoundary>
  );
}
