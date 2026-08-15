"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { timelineVolumes, type TimelineTitle } from "./data";
import { getEditorial, normalizeCharacter } from "./content";
import { SummaryView } from "./summary";
import { defaultCharacterImages, getDefaultCharacterImage } from "./character-images";
import { AuthPanel } from "./auth-panel";
import { supabase } from "./supabase";

type Status = "Pendiente" | "Planificado" | "En curso" | "Visto";

export type WatchLog = {
  status: Status;
  progress: number;
  planStart: string;
  planEnd: string;
  actualStart: string;
  actualEnd: string;
  rating: number;
  favoriteCharacter: string;
  note: string;
};

export type WatchState = Record<string, WatchLog>;

type MediaState = {
  covers: Record<string, string>;
  characterImages: Record<string, string>;
};

const defaultLog: WatchLog = {
  status: "Pendiente",
  progress: 0,
  planStart: "",
  planEnd: "",
  actualStart: "",
  actualEnd: "",
  rating: 0,
  favoriteCharacter: "",
  note: "",
};

const filters = [
  "Todo",
  "Películas",
  "Series",
  "Cortos",
  "Especiales",
  "X-Men",
  "Multiverso",
];

function daysBetween(start: string, end: string) {
  if (!start || !end) return null;
  const startDate = new Date(`${start}T12:00:00`);
  const endDate = new Date(`${end}T12:00:00`);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return null;
  return Math.max(0, Math.round((endDate.getTime() - startDate.getTime()) / 86400000));
}

function matchesFilter(item: TimelineTitle, filter: string) {
  if (filter === "Todo") return true;
  if (filter === "Películas") return item.type === "Película";
  if (filter === "Series") return item.type === "Serie";
  if (filter === "Cortos") return item.type === "Corto";
  if (filter === "Especiales") return item.type === "Especial";
  if (filter === "X-Men") return /x-men/i.test(item.universe);
  if (filter === "Multiverso") return /multiverso/i.test(item.universe);
  return true;
}

function ComicCover({ item, log, poster, onOpen }: { item: TimelineTitle; log: WatchLog; poster: string; onOpen: () => void }) {
  return (
    <button className="comic-card" onClick={onOpen} aria-label={`Abrir cómic ${item.title}`}>
      <span className="cover-shadow" aria-hidden="true" />
      <span className="cover-art">
        <span className="cover-fallback"><small>MARVEL WATCH CLUB</small><strong>{item.title}</strong><em>{item.year}</em></span>
        <img src={poster} alt={`Póster de ${item.title}`} loading="lazy" referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.style.display = "none"; }} />
        <span className="cover-gloss" aria-hidden="true" />
        <span className="issue-number">#{item.number}</span>
      </span>
      <span className={`status-ribbon status-${log.status.toLowerCase().replace(" ", "-")}`}>{log.status}</span>
      <span className="cover-caption"><strong>{item.title}</strong><small>{item.type} · {item.length}</small></span>
    </button>
  );
}

export default function Home() {
  const [view, setView] = useState<"library" | "summary">("library");
  const [activeVolume, setActiveVolume] = useState(0);
  const [filter, setFilter] = useState("Todo");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<TimelineTitle | null>(null);
  const [spread, setSpread] = useState(0);
  const [logs, setLogs] = useState<WatchState>({});
  const [media, setMedia] = useState<MediaState>({ covers: {}, characterImages: {} });
  const [coverDraft, setCoverDraft] = useState("");
  const [coverMessage, setCoverMessage] = useState("");
  const [editingCharacter, setEditingCharacter] = useState<string | null>(null);
  const [portraitDraft, setPortraitDraft] = useState("");
  const [portraitMessage, setPortraitMessage] = useState("");
  const [reviewNotice, setReviewNotice] = useState("");
  const [signedUserId, setSignedUserId] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState("Guardado en este dispositivo");
  const [ready, setReady] = useState(false);
  const cloudReadyUser = useRef<string | null>(null);
  const latestCollection = useRef({ logs, media });

  const allTitles = useMemo(() => timelineVolumes.flatMap((volume) => volume.cards), []);

  useEffect(() => {
    let storedLogs: WatchState | null = null;
    let storedMedia: MediaState | null = null;
    try {
      const stored = window.localStorage.getItem("marvel-comic-timeline-v1");
      if (stored) storedLogs = JSON.parse(stored);
      const storedMediaValue = window.localStorage.getItem("marvel-comic-media-v1");
      if (storedMediaValue) storedMedia = { covers: {}, characterImages: {}, ...JSON.parse(storedMediaValue) };
    } catch { /* Storage may be unavailable in private browsing. */ }
    window.queueMicrotask(() => {
      if (storedLogs) setLogs(storedLogs);
      if (storedMedia) setMedia(storedMedia);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { window.localStorage.setItem("marvel-comic-timeline-v1", JSON.stringify(logs)); } catch { /* Keep session state in memory. */ }
  }, [logs, ready]);

  useEffect(() => {
    if (!ready) return;
    try { window.localStorage.setItem("marvel-comic-media-v1", JSON.stringify(media)); } catch { /* Keep session state in memory. */ }
  }, [media, ready]);

  useEffect(() => { latestCollection.current = { logs, media }; }, [logs, media]);

  const handleAuthUserChange = useCallback((user: { id: string; email: string } | null) => {
    setSignedUserId(user?.id ?? null);
    if (!user) {
      cloudReadyUser.current = null;
      setSyncStatus("Guardado en este dispositivo");
    }
  }, []);

  useEffect(() => {
    const client = supabase;
    if (!ready || !signedUserId || !client) return;
    let cancelled = false;
    cloudReadyUser.current = null;

    const loadCloudCollection = async () => {
      setSyncStatus("Sincronizando colección…");
      const { data, error } = await client
        .from("watch_profiles")
        .select("logs, media")
        .eq("user_id", signedUserId)
        .maybeSingle();

      if (cancelled) return;
      if (error) {
        setSyncStatus("No se pudo sincronizar; los datos siguen seguros en este dispositivo");
        return;
      }

      if (data) {
        setLogs((data.logs as WatchState | null) ?? {});
        setMedia({ covers: {}, characterImages: {}, ...((data.media as MediaState | null) ?? {}) });
      } else {
        const local = latestCollection.current;
        const { error: createError } = await client.from("watch_profiles").upsert({
          user_id: signedUserId,
          logs: local.logs,
          media: local.media,
          updated_at: new Date().toISOString(),
        });
        if (cancelled) return;
        if (createError) {
          setSyncStatus("No se pudo crear el perfil; revisa la configuración de Supabase");
          return;
        }
      }

      cloudReadyUser.current = signedUserId;
      setSyncStatus("Colección sincronizada");
    };

    loadCloudCollection();
    return () => { cancelled = true; };
  }, [ready, signedUserId]);

  useEffect(() => {
    const client = supabase;
    if (!ready || !signedUserId || !client || cloudReadyUser.current !== signedUserId) return;
    setSyncStatus("Guardando cambios…");
    const timeout = window.setTimeout(async () => {
      const { error } = await client.from("watch_profiles").upsert({
        user_id: signedUserId,
        logs,
        media,
        updated_at: new Date().toISOString(),
      });
      setSyncStatus(error ? "Error de sincronización; se conserva la copia local" : "Colección sincronizada");
    }, 650);
    return () => window.clearTimeout(timeout);
  }, [logs, media, ready, signedUserId]);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSpread((value) => Math.min(2, value + 1));
      if (event.key === "ArrowLeft") setSpread((value) => Math.max(0, value - 1));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  const browsingAll = query.trim().length > 0 || filter !== "Todo";
  const sourceTitles = browsingAll ? allTitles : timelineVolumes[activeVolume].cards;
  const normalizedQuery = query.trim().toLocaleLowerCase("es");
  const filteredTitles = sourceTitles.filter((item) => {
    const searchable = `${item.title} ${item.universe} ${item.year} ${item.type}`.toLocaleLowerCase("es");
    return matchesFilter(item, filter) && (!normalizedQuery || searchable.includes(normalizedQuery));
  });
  const pageSize = browsingAll ? 12 : 10;
  const pageCount = Math.max(1, Math.ceil(filteredTitles.length / pageSize));
  const pageTitles = filteredTitles.slice(page * pageSize, page * pageSize + pageSize);
  const seenCount = Object.values(logs).filter((log) => log.status === "Visto").length;
  const activeCount = Object.values(logs).filter((log) => log.status === "En curso").length;

  const getLog = (id: string): WatchLog => ({ ...defaultLog, ...(logs[id] ?? {}) });
  const updateLog = (id: string, patch: Partial<WatchLog>) => {
    setLogs((current) => ({ ...current, [id]: { ...defaultLog, ...(current[id] ?? {}), ...patch } }));
  };
  const posterFor = (item: TimelineTitle) => media.covers[item.id] || item.poster;
  const characterImageFor = (characterName: string) => media.characterImages[characterName] || getDefaultCharacterImage(characterName);
  const openComic = (item: TimelineTitle) => {
    setSelected(item);
    setSpread(0);
    setCoverDraft(posterFor(item));
    setCoverMessage("");
    setEditingCharacter(null);
    setPortraitMessage("");
    setReviewNotice("");
  };
  const editReview = (item: TimelineTitle) => {
    openComic(item);
    setSpread(2);
  };
  const goToView = (nextView: "library" | "summary") => {
    setView(nextView);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };
  const setEpisodeProgress = (progress: number) => {
    if (!selected) return;
    const max = selected.episodes ?? 0;
    const safeProgress = Math.max(0, Math.min(max, progress));
    updateLog(selected.id, {
      progress: safeProgress,
      status: safeProgress === max ? "Visto" : safeProgress > 0 ? "En curso" : currentLog.status,
    });
  };

  const isSecureImageUrl = (value: string) => {
    try { return new URL(value).protocol === "https:"; } catch { return false; }
  };
  const applyCover = () => {
    if (!selected) return;
    const value = coverDraft.trim();
    if (!isSecureImageUrl(value)) {
      setCoverMessage("Pega una URL completa que comience con https://");
      return;
    }
    setMedia((current) => ({ ...current, covers: { ...current.covers, [selected.id]: value } }));
    setCoverMessage("Portada actualizada en la biblioteca y en tu resumen.");
  };
  const restoreCover = () => {
    if (!selected) return;
    setMedia((current) => {
      const covers = { ...current.covers };
      delete covers[selected.id];
      return { ...current, covers };
    });
    setCoverDraft(selected.poster);
    setCoverMessage("Se restauró la portada original.");
  };
  const openPortraitEditor = (characterName: string) => {
    setEditingCharacter(characterName);
    setPortraitDraft(characterImageFor(characterName));
    setPortraitMessage("");
  };
  const applyPortrait = () => {
    if (!editingCharacter) return;
    const value = portraitDraft.trim();
    if (!isSecureImageUrl(value)) {
      setPortraitMessage("Pega una URL completa que comience con https://");
      return;
    }
    setMedia((current) => ({ ...current, characterImages: { ...current.characterImages, [editingCharacter]: value } }));
    setPortraitMessage("Retrato guardado. Se usará en todos los títulos donde aparezca.");
  };
  const restorePortrait = () => {
    if (!editingCharacter) return;
    setMedia((current) => {
      const characterImages = { ...current.characterImages };
      delete characterImages[editingCharacter];
      return { ...current, characterImages };
    });
    setPortraitDraft(defaultCharacterImages[editingCharacter] || "");
    setPortraitMessage(defaultCharacterImages[editingCharacter] ? "Se restauró el retrato sugerido." : "Se restauró el emblema gráfico del personaje.");
  };
  const chooseFavorite = (characterName: string) => {
    if (!selected) return;
    updateLog(selected.id, { favoriteCharacter: characterName });
    setReviewNotice(`MVP actualizado: ${characterName}.`);
  };
  const removeFavorite = () => {
    if (!selected || !currentLog.favoriteCharacter || !window.confirm("¿Quitar el personaje favorito de este título?")) return;
    updateLog(selected.id, { favoriteCharacter: "" });
    setReviewNotice("Personaje favorito eliminado.");
  };
  const setRating = (rating: number) => {
    if (!selected) return;
    updateLog(selected.id, { rating });
    setReviewNotice(`Valoración actualizada a ${rating} de 5.`);
  };
  const removeRating = () => {
    if (!selected || !currentLog.rating || !window.confirm("¿Eliminar la valoración de este título?")) return;
    updateLog(selected.id, { rating: 0 });
    setReviewNotice("Valoración eliminada.");
  };
  const removeNote = () => {
    if (!selected || !currentLog.note || !window.confirm("¿Eliminar definitivamente este comentario?")) return;
    updateLog(selected.id, { note: "" });
    setReviewNotice("Comentario eliminado.");
  };

  const currentLog = selected ? getLog(selected.id) : defaultLog;
  const hasProgress = Boolean(selected?.episodes && selected.episodes > 1);
  const plannedDays = daysBetween(currentLog.planStart, currentLog.planEnd);
  const actualDays = daysBetween(currentLog.actualStart, currentLog.actualEnd);
  const selectedEditorial = selected ? getEditorial(selected) : null;
  const selectedCharacters = selectedEditorial?.characters.map(normalizeCharacter) ?? [];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Marvel Watch Club, inicio"><span className="brand-mark">M</span><span><strong>MARVEL</strong><small>WATCH CLUB</small></span></a>
        <nav aria-label="Navegación principal"><button className={view === "library" ? "nav-active" : ""} onClick={() => goToView("library")}>Biblioteca</button><button className={view === "summary" ? "nav-active" : ""} onClick={() => goToView("summary")}>Mi resumen</button></nav>
        <AuthPanel syncStatus={syncStatus} onUserChange={handleAuthUserChange} />
      </header>

      {view === "library" ? <>
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">EDICIÓN CRONOLÓGICA · 96 HISTORIAS</p>
          <h1>Tu colección del<br /><em>Universo Marvel</em></h1>
          <p>Abre cada portada, registra tu viaje y descubre qué personajes terminan dominando tu multiverso.</p>
          <a className="primary-cta" href="#biblioteca">Explorar la colección <span>↓</span></a>
        </div>
        <div className="hero-stats" id="resumen">
          <div><strong>{seenCount}</strong><span>de 96</span><small>VISTOS</small></div>
          <div><strong>{activeCount}</strong><span>historias</span><small>EN CURSO</small></div>
          <div><strong>{Math.round((seenCount / 96) * 100)}%</strong><span>completado</span><small>TU VIAJE</small></div>
        </div>
      </section>

      <section className="library" id="biblioteca">
        <div className="section-heading">
          <div><p className="eyebrow">ORDEN CRONOLÓGICO–NARRATIVO</p><h2>La biblioteca</h2></div>
          <label className="search-box"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(0); }} placeholder="Buscar título, universo o año…" aria-label="Buscar títulos" /></label>
        </div>

        <div className="filters" role="group" aria-label="Filtros">
          {filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => { setFilter(item); setPage(0); }}>{item}</button>)}
        </div>

        {!browsingAll && (
          <div className="volume-strip" aria-label="Volúmenes cronológicos">
            {timelineVolumes.map((volume, index) => {
              const completed = volume.cards.filter((item) => getLog(item.id).status === "Visto").length;
              return (
                <button key={volume.volume} className={index === activeVolume ? "active" : ""} onClick={() => { setActiveVolume(index); setPage(0); }}>
                  <span>VOL. {String(index + 1).padStart(2, "0")}</span><strong>{volume.volume}</strong><small>{completed}/{volume.cards.length} vistos</small>
                </button>
              );
            })}
          </div>
        )}

        <div className="collection-heading">
          <div><span className="chapter-diamond">◆</span><div><small>{browsingAll ? "RESULTADOS DEL ARCHIVO" : `VOLUMEN ${String(activeVolume + 1).padStart(2, "0")}`}</small><h3>{browsingAll ? `${filteredTitles.length} títulos encontrados` : timelineVolumes[activeVolume].volume}</h3></div></div>
          <p>Página {Math.min(page + 1, pageCount)} de {pageCount}</p>
        </div>

        {pageTitles.length ? (
          <div className="comic-grid">{pageTitles.map((item) => <ComicCover key={item.id} item={item} log={getLog(item.id)} poster={posterFor(item)} onOpen={() => openComic(item)} />)}</div>
        ) : (
          <div className="empty-state"><strong>Sin coincidencias en este panel.</strong><span>Prueba otro título, universo o filtro.</span></div>
        )}

        {pageCount > 1 && (
          <div className="pagination" aria-label="Paginación">
            <button disabled={page === 0} onClick={() => setPage((value) => Math.max(0, value - 1))}>← Anterior</button>
            <div>{Array.from({ length: pageCount }, (_, index) => <button key={index} className={index === page ? "active" : ""} onClick={() => setPage(index)} aria-label={`Ir a la página ${index + 1}`}>{index + 1}</button>)}</div>
            <button disabled={page >= pageCount - 1} onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}>Siguiente →</button>
          </div>
        )}
      </section>
      </> : <SummaryView logs={logs} coverUrls={media.covers} characterImages={{ ...defaultCharacterImages, ...media.characterImages }} onOpen={openComic} onEdit={editReview} onExplore={() => goToView("library")} />}

      <footer><strong>MARVEL WATCH CLUB</strong><span>{signedUserId ? syncStatus : "Tu progreso se guarda en este navegador."}</span><a href="#top">Volver arriba ↑</a></footer>

      {selected && (
        <div className="reader-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <section className="comic-reader" role="dialog" aria-modal="true" aria-label={`Cómic de ${selected.title}`}>
            <div className="reader-toolbar"><div><span>ARCHIVO #{selected.number}</span><strong>{selected.title}</strong></div><button onClick={() => setSelected(null)} aria-label="Cerrar cómic">×</button></div>

            <div className="book" key={spread}>
              {spread === 0 && (
                <>
                  <article className="book-page cover-page">
                    <div className="reader-cover-fallback"><strong>{selected.title}</strong><span>{selected.year}</span></div>
                    <img key={posterFor(selected)} src={posterFor(selected)} alt={`Portada de ${selected.title}`} referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                    <span className="reader-issue">#{selected.number}</span>
                  </article>
                  <article className="book-page story-page">
                    <div className="story-kicker"><p className="panel-label yellow">ARCHIVO DEL MULTIVERSO</p><div className="era-stamp"><small>LA HISTORIA SUCEDE EN</small><strong>{selected.year}</strong></div></div>
                    <p className="meta-line">{selected.universe} · {selected.type} · {selected.length}</p><h2>{selected.title}</h2>
                    <div className="story-intro"><strong>SINOPSIS</strong><p>{selectedEditorial?.synopsis}</p></div>
                    <div className="fact-panels"><div><small>ÉPOCA NARRATIVA</small><strong>{selected.year}</strong></div><div><small>UNIVERSO</small><strong>{selected.universe}</strong></div><div><small>ESTADO</small><strong>{currentLog.status}</strong></div></div>
                    <details className="media-editor cover-editor">
                      <summary><span aria-hidden="true">▣</span> Cambiar portada por URL</summary>
                      <div className="media-editor-body">
                        <label>Dirección de la nueva portada<input type="url" inputMode="url" value={coverDraft} onChange={(event) => { setCoverDraft(event.target.value); setCoverMessage(""); }} placeholder="https://sitio.com/portada.jpg" /></label>
                        <p>Usa una imagen vertical y una dirección HTTPS. El cambio se verá también en la biblioteca y en “Mi resumen”.</p>
                        <div className="media-editor-actions"><button onClick={applyCover}>Aplicar portada</button><button className="secondary" onClick={restoreCover} disabled={!media.covers[selected.id]}>Restaurar original</button></div>
                        {coverMessage && <small className="media-message" role="status">{coverMessage}</small>}
                      </div>
                    </details>
                    <button className="ink-button" onClick={() => setSpread(1)}>Abrir mi seguimiento →</button>
                  </article>
                </>
              )}

              {spread === 1 && (
                <>
                  <article className="book-page tracking-page">
                    <p className="panel-label blue">MI SEGUIMIENTO</p><h2>¿Dónde vas?</h2>
                    <div className="status-picker" role="group" aria-label="Estado de seguimiento">{(["Pendiente", "Planificado", "En curso", "Visto"] as Status[]).map((status) => <button key={status} className={currentLog.status === status ? "active" : ""} onClick={() => updateLog(selected.id, { status })}>{status}</button>)}</div>
                    {hasProgress ? (
                      <div className="progress-panel">
                        <div><strong>Progreso por capítulos</strong><span>{currentLog.progress} de {selected.episodes}</span></div>
                        <div className="progress-controls"><button onClick={() => setEpisodeProgress(currentLog.progress - 1)} disabled={currentLog.progress === 0} aria-label="Restar un capítulo">−</button><label>Capítulos vistos<select value={Math.min(currentLog.progress, selected.episodes ?? 0)} onChange={(event) => setEpisodeProgress(Number(event.target.value))}>{Array.from({ length: (selected.episodes ?? 0) + 1 }, (_, value) => <option key={value} value={value}>{value} de {selected.episodes}</option>)}</select></label><button onClick={() => setEpisodeProgress(currentLog.progress + 1)} disabled={currentLog.progress === selected.episodes} aria-label="Sumar un capítulo">+</button></div>
                        <div className="episode-dots">{Array.from({ length: selected.episodes ?? 0 }, (_, index) => <button key={index} className={index < currentLog.progress ? "done" : ""} onClick={() => setEpisodeProgress(index + 1)} aria-label={`Marcar ${index + 1} capítulos vistos`}>{index + 1}</button>)}</div>
                      </div>
                    ) : (
                      <div className="single-unit-note"><span>✓</span><p><strong>Contenido de una sola pieza</strong>No necesita una barra de progreso. Registra sus fechas y márcalo como visto cuando termines.</p></div>
                    )}
                  </article>

                  <article className="book-page dates-page">
                    <p className="panel-label red">CALENDARIO DE VISIONADO</p><h2>Plan vs. realidad</h2>
                    <div className="date-card planned"><div><span>01</span><strong>PLANIFICACIÓN</strong>{plannedDays !== null && <small>{plannedDays} días proyectados</small>}</div><label>Inicio previsto<input type="date" value={currentLog.planStart} onChange={(event) => updateLog(selected.id, { planStart: event.target.value })} /></label><label>Final previsto<input type="date" value={currentLog.planEnd} onChange={(event) => updateLog(selected.id, { planEnd: event.target.value })} /></label></div>
                    <div className="date-card actual"><div><span>02</span><strong>REGISTRO REAL</strong>{actualDays !== null && <small>{actualDays} días utilizados</small>}</div><label>Inicio real<input type="date" value={currentLog.actualStart} onChange={(event) => updateLog(selected.id, { actualStart: event.target.value })} /></label><label>Final real<input type="date" value={currentLog.actualEnd} onChange={(event) => updateLog(selected.id, { actualEnd: event.target.value, status: event.target.value ? "Visto" : currentLog.status })} /></label></div>
                    {plannedDays !== null && actualDays !== null && <p className="date-result">Terminaste {Math.abs(actualDays - plannedDays)} día(s) {actualDays <= plannedDays ? "antes o según lo previsto" : "después de lo proyectado"}.</p>}
                  </article>
                </>
              )}

              {spread === 2 && (
                <>
                  <article className="book-page favorite-page">
                    <p className="panel-label yellow">PERSONAJE FAVORITO</p><h2>Elige a tu MVP</h2><p className="page-copy">Tu elección es personal para este título y luego podrá compararse con la del resto del club.</p>
                    <div className="character-grid">{selectedCharacters.map((character, index) => {
                      const portrait = characterImageFor(character.name);
                      const isFavorite = currentLog.favoriteCharacter === character.name;
                      return <article key={character.name} className={`character-card ${isFavorite ? "active" : ""}`}>
                        <button className="character-choice" onClick={() => chooseFavorite(character.name)} aria-pressed={isFavorite}>
                          <span className="character-avatar" style={{ background: `linear-gradient(145deg, ${character.colors?.[0] ?? "#245c91"}, ${character.colors?.[1] ?? "#cf9e35"})` }}>
                            <i className={`portrait-shape portrait-${index % 4}`} /><b>{character.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2)}</b>
                            {portrait && <img key={portrait} src={portrait} alt={`Retrato de ${character.name}`} referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.style.display = "none"; }} />}
                          </span>
                          <strong>{character.name}</strong><em>{character.alias}</em><small>{isFavorite ? "★ MI FAVORITO" : "ELEGIR MVP"}</small>
                        </button>
                        <button className="character-image-trigger" onClick={() => openPortraitEditor(character.name)} aria-label={`Cambiar imagen de ${character.name}`}><span aria-hidden="true">▣</span>{portrait ? "CAMBIAR IMAGEN" : "AÑADIR IMAGEN"}</button>
                      </article>;
                    })}</div>
                    {editingCharacter && <section className="character-media-editor">
                      <div><p><small>RETRATO PERSONALIZADO</small><strong>{editingCharacter}</strong></p><button onClick={() => setEditingCharacter(null)} aria-label="Cerrar editor de imagen">×</button></div>
                      <label>URL de foto, icono o logo<input type="url" inputMode="url" value={portraitDraft} onChange={(event) => { setPortraitDraft(event.target.value); setPortraitMessage(""); }} placeholder="https://sitio.com/personaje.jpg" /></label>
                      <p>Una imagen cuadrada funciona mejor. Se guardará para este personaje en toda la colección.</p>
                      <div className="media-editor-actions"><button onClick={applyPortrait}>Aplicar retrato</button><button className="secondary" onClick={restorePortrait} disabled={!media.characterImages[editingCharacter]}>{defaultCharacterImages[editingCharacter] ? "Restaurar sugerida" : "Usar emblema"}</button></div>
                      {portraitMessage && <small className="media-message" role="status">{portraitMessage}</small>}
                    </section>}
                    <label className="custom-character">¿No aparece?<input type="text" placeholder="Escribe otro personaje" value={selectedCharacters.some((character) => character.name === currentLog.favoriteCharacter) ? "" : currentLog.favoriteCharacter} onChange={(event) => { updateLog(selected.id, { favoriteCharacter: event.target.value }); setReviewNotice("Editando el MVP personalizado…"); }} /></label>
                    <div className="record-actions"><span>{currentLog.favoriteCharacter ? "Selecciona otro personaje para cambiar tu elección." : "Todavía no elegiste un MVP."}</span>{currentLog.favoriteCharacter && <button className="danger-action" onClick={removeFavorite}>Quitar MVP</button>}</div>
                  </article>

                  <article className="book-page opinion-page">
                    <p className="panel-label purple">MI OPINIÓN</p><h2>Tu reseña</h2>
                    <div className="rating-picker" role="group" aria-label="Calificación">{[1, 2, 3, 4, 5].map((rating) => <button key={rating} onClick={() => setRating(rating)} aria-label={`Cambiar valoración a ${rating} estrellas`}><span className={rating <= currentLog.rating ? "filled" : ""}>★</span></button>)}</div>
                    <div className="record-actions compact"><span>{currentLog.rating ? `Valoración actual: ${currentLog.rating}/5. Pulsa otra estrella para editarla.` : "Aún no hay valoración."}</span>{currentLog.rating > 0 && <button className="danger-action" onClick={removeRating}>Eliminar valoración</button>}</div>
                    <label className="note-field">¿Qué te dejó esta historia?<textarea value={currentLog.note} onChange={(event) => { updateLog(selected.id, { note: event.target.value }); setReviewNotice("Comentario en edición. Se guarda automáticamente."); }} placeholder="Escribe una opinión breve…" maxLength={280} /><small>{currentLog.note.length}/280</small></label>
                    <div className="record-actions"><button className="save-action" onClick={() => setReviewNotice("Comentario actualizado y guardado.")} disabled={!currentLog.note.trim()}>Guardar cambios</button>{currentLog.note && <button className="danger-action" onClick={removeNote}>Eliminar comentario</button>}</div>
                    {reviewNotice && <p className="review-notice" role="status">{reviewNotice}</p>}
                    <div className="club-panel"><span>CLUB</span><div><strong>{currentLog.favoriteCharacter || "Aún sin favorito"}</strong><small>Tu personaje elegido</small></div><p>Las elecciones del equipo aparecerán aquí cuando se añadan más participantes.</p></div>
                    {currentLog.status !== "Visto" && <button className="seen-button" onClick={() => updateLog(selected.id, { status: "Visto" })}>MARCAR COMO VISTO ✓</button>}
                  </article>
                </>
              )}
            </div>

            <div className="reader-navigation">
              <button onClick={() => setSpread((value) => Math.max(0, value - 1))} disabled={spread === 0}>← Página anterior</button>
              <div>{["Historia", "Seguimiento", "Favorito y opinión"].map((label, index) => <button key={label} className={spread === index ? "active" : ""} onClick={() => setSpread(index)}><span>{index + 1}</span>{label}</button>)}</div>
              <button onClick={() => setSpread((value) => Math.min(2, value + 1))} disabled={spread === 2}>Página siguiente →</button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
