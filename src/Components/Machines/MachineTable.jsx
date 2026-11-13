import { MACHINE_STATUSES } from '../../constants/machines';
import { getStatusClass } from '../../utils/machines';

function MachineTable({
  machines,
  compact = false,
  onStatusChange,
  onDelete,
}) {
  if (machines.length === 0) {
    return (
      <p className="empty-state" role="status">
        Aucune machine ne correspond à votre recherche.
      </p>
    );
  }

  return (
    <div className="machine-table-wrap">
      <table className="machine-table">
        <thead>
          <tr>
            <th scope="col">Machine</th>
            <th scope="col">Zone</th>
            <th scope="col">Statut</th>
            <th scope="col">Production du jour</th>
            {!compact && <th scope="col">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id}>
              <td>
                <span className="machine-name">{machine.name}</span>
                <span className="machine-id">{machine.id}</span>
              </td>
              <td>{machine.zone}</td>
              <td>
                {compact ? (
                  <span className={`status-badge ${getStatusClass(machine.status)}`}>
                    {machine.status}
                  </span>
                ) : (
                  <select
                    aria-label={`Statut de ${machine.name}`}
                    className="machine-status-select"
                    onChange={(event) =>
                      onStatusChange(machine.id, event.target.value)
                    }
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
              <td>{machine.dailyProduction.toLocaleString('fr-FR')} pièces</td>
              {!compact && (
                <td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MachineTable;
