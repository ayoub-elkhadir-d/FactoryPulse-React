function StatCard({ label, value, note, tone = '' }) {
  return (
    <article className={`stat-card ${tone}`.trim()}>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      <span className="stat-note">{note}</span>
    </article>
  );
}

export default StatCard;
