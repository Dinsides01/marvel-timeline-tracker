"use client";

import { timelineVolumes, type TimelineTitle } from "./data";
import type { WatchState } from "./page";
import { getDefaultCharacterImage } from "./character-images";

const emptyLog = {
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

function stars(value: number) {
  return `${"★".repeat(value)}${"☆".repeat(Math.max(0, 5 - value))}`;
}

export function SummaryView({ logs, coverUrls, characterImages, onOpen, onEdit, onExplore }: { logs: WatchState; coverUrls: Record<string, string>; characterImages: Record<string, string>; onOpen: (item: TimelineTitle) => void; onEdit: (item: TimelineTitle) => void; onExplore: () => void }) {
  const allTitles = timelineVolumes.flatMap((volume) => volume.cards);
  const posterFor = (item: TimelineTitle) => coverUrls[item.id] || item.poster;
  const records = allTitles.map((item) => ({ item, log: { ...emptyLog, ...(logs[item.id] ?? {}) } }));
  const seen = records.filter(({ log }) => log.status === "Visto");
  const active = records.filter(({ log }) => log.status === "En curso");
  const planned = records.filter(({ log }) => log.status === "Planificado");
  const rated = records.filter(({ log }) => log.rating > 0);
  const reviewed = records.filter(({ log }) => log.note.trim() || log.rating || log.favoriteCharacter);
  const average = rated.length ? rated.reduce((sum, { log }) => sum + log.rating, 0) / rated.length : 0;
  const favorites = Object.entries(records.reduce<Record<string, number>>((counts, { log }) => {
    if (log.favoriteCharacter) counts[log.favoriteCharacter] = (counts[log.favoriteCharacter] ?? 0) + 1;
    return counts;
  }, {})).sort((a, b) => b[1] - a[1]);
  const dated = records.filter(({ log }) => log.actualEnd).sort((a, b) => b.log.actualEnd.localeCompare(a.log.actualEnd));
  const upcoming = records.filter(({ log }) => log.planStart && log.status !== "Visto").sort((a, b) => a.log.planStart.localeCompare(b.log.planStart)).slice(0, 5);
  const best = [...rated].sort((a, b) => b.log.rating - a.log.rating).slice(0, 4);
  const statusSegments = [
    ["Vistos", seen.length, "var(--green)"],
    ["En curso", active.length, "var(--blue)"],
    ["Planificados", planned.length, "var(--purple)"],
    ["Pendientes", 96 - seen.length - active.length - planned.length, "var(--yellow)"],
  ] as const;

  return (
    <section className="summary-view" id="mi-resumen">
      <header className="summary-hero">
        <div>
          <p className="eyebrow">EXPEDIENTE PERSONAL · DATOS DE TU COLECCIÓN</p>
          <h1>Mi resumen<br /><em>multiversal</em></h1>
          <p>Cada elección, fecha y opinión registrada en los cómics se convierte aquí en la historia de tu maratón.</p>
        </div>
        <div className="summary-progress-seal">
          <strong>{Math.round((seen.length / 96) * 100)}%</strong>
          <span>DEL VIAJE COMPLETADO</span>
          <small>{seen.length} DE 96 TÍTULOS</small>
        </div>
      </header>

      <div className="summary-kpis">
        <article><span>01</span><strong>{seen.length}</strong><small>VISTOS</small><p>Historias terminadas</p></article>
        <article><span>02</span><strong>{active.length}</strong><small>EN CURSO</small><p>Viajes abiertos</p></article>
        <article><span>03</span><strong>{average ? average.toFixed(1) : "—"}</strong><small>MEDIA / 5</small><p>{rated.length} títulos valorados</p></article>
        <article><span>04</span><strong>{favorites.length}</strong><small>MVP ELEGIDOS</small><p>Personajes distintos</p></article>
      </div>

      <div className="summary-grid">
        <article className="summary-panel journey-panel">
          <div className="summary-panel-title"><span>ESTADO DEL VIAJE</span><strong>96 HISTORIAS</strong></div>
          <div className="status-bar" aria-label="Distribución por estados">
            {statusSegments.filter(([, value]) => value > 0).map(([label, value, color]) => <span key={label} title={`${label}: ${value}`} style={{ width: `${(value / 96) * 100}%`, background: color }} />)}
          </div>
          <div className="status-legend">{statusSegments.map(([label, value, color]) => <div key={label}><i style={{ background: color }} /><strong>{value}</strong><span>{label}</span></div>)}</div>
          <h3>Progreso por volumen</h3>
          <div className="volume-progress-list">
            {timelineVolumes.map((volume, index) => {
              const completed = volume.cards.filter((item) => logs[item.id]?.status === "Visto").length;
              const percent = volume.cards.length ? (completed / volume.cards.length) * 100 : 0;
              return <div key={volume.volume}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{volume.volume}</strong><i><b style={{ width: `${percent}%` }} /></i></div><small>{completed}/{volume.cards.length}</small></div>;
            })}
          </div>
        </article>

        <article className="summary-panel mvp-panel">
          <div className="summary-panel-title"><span>SALÓN DE MVP</span><strong>{favorites.length} PERSONAJES</strong></div>
          {favorites.length ? (
            <div className="favorite-ranking">
              {favorites.slice(0, 6).map(([name, count], index) => <div key={name} className={index === 0 ? "champion" : ""}><span>{index + 1}</span><i><b /><em /><img src={characterImages[name] || getDefaultCharacterImage(name)} alt={`Retrato de ${name}`} referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.style.display = "none"; }} /></i><div><strong>{name}</strong><small>{count} {count === 1 ? "elección" : "elecciones"}</small></div>{index === 0 && <mark>★ FAVORITO</mark>}</div>)}
            </div>
          ) : (
            <div className="summary-empty"><strong>Aún no hay un MVP</strong><p>Elige un personaje favorito dentro de cualquier cómic y aparecerá en este ranking.</p></div>
          )}
        </article>

        <article className="summary-panel rated-panel">
          <div className="summary-panel-title"><span>MEJOR VALORADOS</span><strong>{rated.length} RESEÑAS</strong></div>
          {best.length ? <div className="best-list">{best.map(({ item, log }) => <button key={item.id} onClick={() => onOpen(item)}><span className="mini-cover"><img src={posterFor(item)} alt="" referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.style.display = "none"; }} /></span><div><strong>{item.title}</strong><small>{stars(log.rating)}</small></div><b>{log.rating}.0</b></button>)}</div> : <div className="summary-empty"><strong>Tu podio está esperando</strong><p>Califica un título para empezar a construir tu lista de favoritos.</p></div>}
        </article>

        <article className="summary-panel calendar-panel">
          <div className="summary-panel-title"><span>PRÓXIMAS HISTORIAS</span><strong>{planned.length} PLANIFICADAS</strong></div>
          {upcoming.length ? <div className="upcoming-list">{upcoming.map(({ item, log }) => <button key={item.id} onClick={() => onOpen(item)}><time><strong>{new Date(`${log.planStart}T12:00:00`).toLocaleDateString("es", { day: "2-digit" })}</strong><span>{new Date(`${log.planStart}T12:00:00`).toLocaleDateString("es", { month: "short" }).toUpperCase()}</span></time><div><strong>{item.title}</strong><small>{item.type} · termina {log.planEnd || "sin fecha"}</small></div><b>→</b></button>)}</div> : <div className="summary-empty"><strong>Sin próximas fechas</strong><p>Planifica el inicio de un título y aparecerá aquí como tu siguiente lectura.</p></div>}
        </article>
      </div>

      <section className="summary-archive">
        <div className="summary-archive-heading"><div><p className="eyebrow">TU HEMEROTECA PERSONAL</p><h2>Opiniones y recuerdos</h2></div><span>{reviewed.length} fichas con datos</span></div>
        {reviewed.length ? (
          <div className="memory-grid">{reviewed.slice().sort((a, b) => (b.log.actualEnd || "").localeCompare(a.log.actualEnd || "")).slice(0, 8).map(({ item, log }) => <article key={item.id} className="memory-entry"><button className="memory-entry-open" onClick={() => onOpen(item)}><span className="memory-cover"><img src={posterFor(item)} alt="" referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.style.display = "none"; }} /><i>{item.number}</i></span><span className="memory-copy"><small>{log.actualEnd || item.year}</small><strong>{item.title}</strong>{log.rating > 0 && <em>{stars(log.rating)}</em>}<p>{log.note || `MVP: ${log.favoriteCharacter || "sin elegir"}`}</p>{log.favoriteCharacter && <mark>★ {log.favoriteCharacter}</mark>}</span></button><button className="memory-edit" onClick={() => onEdit(item)}>Editar o eliminar registro →</button></article>)}</div>
        ) : (
          <div className="summary-empty large"><strong>Tu archivo está en blanco</strong><p>Abre una portada, registra fechas, elige tu MVP o escribe una reseña. Todo quedará recopilado aquí.</p><button onClick={onExplore}>Abrir la biblioteca →</button></div>
        )}
      </section>

      {dated.length > 0 && <p className="last-finished">ÚLTIMA HISTORIA TERMINADA · <strong>{dated[0].item.title}</strong> · {dated[0].log.actualEnd}</p>}
    </section>
  );
}
