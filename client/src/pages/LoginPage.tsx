import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { fullSync } from '../sync/sync';
import { Mascot } from '../components/Mascot';
import { SpeechBubble } from '../components/SpeechBubble';
import { useT } from '../i18n';

export function LoginPage({ mode = 'login' }: { mode?: 'login' | 'register' }) {
  const t = useT();
  const nav = useNavigate();
  const login = useAuth((s) => s.login);
  const register = useAuth((s) => s.register);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isRegister = mode === 'register';

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (isRegister) await register(email, password, name || undefined);
      else await login(email, password);
      try {
        await fullSync();
      } catch {
        /* sync errors are shown in settings */
      }
      nav('/');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-4">
      <div className="flex items-end gap-3">
        <Mascot mood="happy" size={90} />
        <SpeechBubble>
          <p className="font-bold">{isRegister ? t.auth.registerGreeting : t.auth.loginGreeting}</p>
          <p className="text-xs text-muted">{t.auth.optional}</p>
        </SpeechBubble>
      </div>
      <form onSubmit={submit} className="card space-y-3 p-6">
        <h1 className="text-2xl font-black text-rose">{isRegister ? t.account.register : t.account.login}</h1>
        {isRegister && (
          <label className="block text-sm font-bold">
            {t.auth.displayName}
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} className="mt-1 w-full rounded-full bg-cream px-4 py-2 ring-2 ring-sakura/50 focus:outline-none focus:ring-rose dark:bg-bg" />
          </label>
        )}
        <label className="block text-sm font-bold">
          {t.auth.email}
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="mt-1 w-full rounded-full bg-cream px-4 py-2 ring-2 ring-sakura/50 focus:outline-none focus:ring-rose dark:bg-bg" />
        </label>
        <label className="block text-sm font-bold">
          {t.auth.password} {isRegister && <span className="font-normal text-muted">{t.auth.passwordRule}</span>}
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            className="mt-1 w-full rounded-full bg-cream px-4 py-2 ring-2 ring-sakura/50 focus:outline-none focus:ring-rose dark:bg-bg"
          />
        </label>
        {error && (
          <p className="text-sm font-bold text-rose" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn-primary w-full" disabled={busy}>
          {busy ? t.auth.busy : isRegister ? t.auth.createAccount : t.account.login}
        </button>
        <p className="text-center text-sm text-muted">
          {isRegister ? (
            <>
              {t.auth.haveAccount}{' '}
              <Link to="/login" className="font-bold text-rose underline">
                {t.account.login}
              </Link>
            </>
          ) : (
            <>
              {t.auth.noAccount}{' '}
              <Link to="/register" className="font-bold text-rose underline">
                {t.account.register}
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
