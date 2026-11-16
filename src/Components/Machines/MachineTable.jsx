import { MACHINE_STATUSES } from '../../constants/machines';
import { getStatusClass } from '../../utils/machines';

function MachineTable({
  machines,
  compact = false,
  onStatusChange,
  onDelete,
}) {
  if (machines.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={`machine-table-wrap ${compact ? 'compact-table' : ''}`}>
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
              <MachineCard
                compact={compact}
                key={machine.id}
                machine={machine}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))}
          </tbody>
        </table>
    </div>
  );
}

export default MachineTable;
