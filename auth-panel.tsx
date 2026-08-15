"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { isSupabaseConfigured, supabase } from "./supabase";

type AuthUser = { id: string; email: string } | null;

export function AuthPanel({ syncStatus, onUserChange }: { syncStatus: string; onUserChange: (user: AuthUser) => void }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [user, setUser] = useState<AuthUser>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) {
      onUserChange(null);
      return;
    }

    const applySession = (sessionUser?: { id: string; email?: string } | null) => {
      const nextUser = sessionUser ? { id: sessionUser.id, email: sessionUser.email ?? "Mi cuenta" } : null;
      setUser(nextUser);
      onUserChange(nextUser);
    };

    supabase.auth.getSession().then(({ data }) => applySession(data.session?.user));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => applySession(session?.user));
    return () => data.subscription.unsubscribe();
  }, [onUserChange]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setMessage("");

    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email: email.trim(), password })
      : await supabase.auth.signUp({ email: email.trim(), password });

    setLoading(false);
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    setPassword("");
    setMessage(mode === "signup" && !result.data.session
      ? "Revisa tu correo para confirmar la cuenta."
      : "Sesión iniciada. Tu colección ya puede sincronizarse.");
  };

  const signOut = async () => {
    if (!supabase) return;
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    setMessage("Sesión cerrada. Tus datos locales permanecen en este dispositivo.");
  };

  return (
    <>
      <button className="profile-chip" onClick={() => setOpen(true)} aria-label={user ? "Abrir mi cuenta" : "Iniciar sesión"}>
        <span className={`online-dot ${user ? "connected" : ""}`} />
        <span>{user ? user.email.split("@")[0] : "Iniciar sesión"}</span><b>⌄</b>
      </button>

      {open && typeof document !== "undefined" && createPortal((
        <div className="auth-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section className="auth-panel" role="dialog" aria-modal="true" aria-labelledby="auth-title">
            <div className="auth-panel-heading"><div><small>IDENTIDAD DEL COLECCIONISTA</small><h2 id="auth-title">{user ? "Mi cuenta" : mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}</h2></div><button onClick={() => setOpen(false)} aria-label="Cerrar acceso">×</button></div>

            {!isSupabaseConfigured ? (
              <div className="auth-setup-note"><strong>Acceso listo para conectar</strong><p>Añade las variables de Supabase indicadas en el archivo <code>.env.example</code>. La biblioteca continuará guardándose localmente mientras tanto.</p></div>
            ) : user ? (
              <div className="account-card">
                <span>{user.email.slice(0, 1).toUpperCase()}</span>
                <div><small>SESIÓN ACTIVA</small><strong>{user.email}</strong><p>{syncStatus}</p></div>
                <button onClick={signOut} disabled={loading}>Cerrar sesión</button>
              </div>
            ) : (
              <>
                <div className="auth-tabs" role="tablist"><button className={mode === "signin" ? "active" : ""} onClick={() => { setMode("signin"); setMessage(""); }}>Ingresar</button><button className={mode === "signup" ? "active" : ""} onClick={() => { setMode("signup"); setMessage(""); }}>Registrarme</button></div>
                <form className="auth-form" onSubmit={submit}>
                  <label>Correo electrónico<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@correo.com" required /></label>
                  <label>Contraseña<input type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} placeholder="Mínimo 6 caracteres" required /></label>
                  <button type="submit" disabled={loading}>{loading ? "Procesando…" : mode === "signin" ? "Entrar a mi colección" : "Crear mi cuenta"}</button>
                </form>
              </>
            )}
            {message && <p className="auth-message" role="status">{message}</p>}
            <p className="auth-privacy">Tu contraseña es gestionada por Supabase; esta aplicación nunca la almacena.</p>
          </section>
        </div>
      ), document.body)}
    </>
  );
}
