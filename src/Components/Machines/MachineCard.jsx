import { MACHINE_STATUSES } from '../../constants/machines';
import StatusBadge from './StatusBadge';

function MachineCard({
  machine,
  compact = false,
  onStatusChange,
  onDelete,
}) {
  return (
    <tr>
      <td data-label="Machine">
        <div>
          <strong className="machine-name">{machine.name}</strong>
          <span className="machine-id">{machine.id}</span>
        </div>
      </td>
      <td data-label="Zone">{machine.zone}</td>
      <td data-label="Statut">
        {compact ? (
          <StatusBadge status={machine.status} />
        ) : (
          <select
            aria-label={`Statut de ${machine.name}`}
            className="machine-status-select"
            onChange={(event) => onStatusChange(machine.id, event.target.value)}
            value={machine.status}
          >
            {MACHINE_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        )}
      </td>
      <td data-label="Production du jour">
        {machine.dailyProduction.toLocaleString('fr-FR')} pièces
      </td>
      {!compact && (
        <td data-label="Actions">
          <button
            aria-label={`Supprimer ${machine.name}`}
            className="delete-button"
            onClick={() => {
              if (window.confirm(`Supprimer la machine « ${machine.name} » ?`)) {
                onDelete(machine.id);
              }
            }}
            type="button"
          >
            Supprimer
          </button>
        </td>
      )}
    </tr>
  );
}

export default MachineCard;
