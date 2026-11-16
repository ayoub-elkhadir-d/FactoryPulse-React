import { MACHINE_STATUSES } from '../../constants/machines';

function StatusFilter({ value, onChange }) {
  return (
    <label>
      <span className="sr-only">Filtrer par statut</span>
      <select
        aria-label="Filtrer par statut"
        className="filter-select"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">Tous les statuts</option>
        {MACHINE_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </label>
  );
}

export default StatusFilter;
