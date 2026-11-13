import { getStatusClass } from '../../utils/machines';

function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
