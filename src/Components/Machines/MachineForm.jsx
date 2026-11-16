import { Link } from 'react-router-dom';
import { MACHINE_STATUSES } from '../../constants/machines';

function MachineForm({ form, errors, onChange, onSubmit }) {
  return (
    <form className="machine-form" noValidate onSubmit={onSubmit}>
      <div className="form-field">
        <label htmlFor="machine-name">Nom de la machine</label>
        <input
          aria-describedby={errors.name ? 'machine-name-error' : undefined}
          aria-invalid={Boolean(errors.name)}
          id="machine-name"
          name="name"
          onChange={onChange}
          placeholder="Ex. Presse hydraulique 01"
          value={form.name}
        />
        {errors.name && (
          <span className="form-error" id="machine-name-error">
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="machine-zone">Zone de production</label>
        <input
          aria-describedby={errors.zone ? 'machine-zone-error' : undefined}
          aria-invalid={Boolean(errors.zone)}
          id="machine-zone"
          name="zone"
          onChange={onChange}
          placeholder="Ex. Atelier A"
          value={form.zone}
        />
        {errors.zone && (
          <span className="form-error" id="machine-zone-error">
            {errors.zone}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="machine-status">Statut</label>
        <select
          aria-describedby={errors.status ? 'machine-status-error' : undefined}
          aria-invalid={Boolean(errors.status)}
          id="machine-status"
          name="status"
          onChange={onChange}
          value={form.status}
        >
          {MACHINE_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.status && (
          <span className="form-error" id="machine-status-error">
            {errors.status}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="machine-production">Production journalière (pièces)</label>
        <input
          aria-describedby={
            errors.dailyProduction ? 'machine-production-error' : undefined
          }
          aria-invalid={Boolean(errors.dailyProduction)}
          id="machine-production"
          min="0"
          name="dailyProduction"
          onChange={onChange}
          step="1"
          type="number"
          value={form.dailyProduction}
        />
        {errors.dailyProduction && (
          <span className="form-error" id="machine-production-error">
            {errors.dailyProduction}
          </span>
        )}
      </div>

      <div className="form-actions">
        <Link className="secondary-button" to="/machines">
          Annuler
        </Link>
        <button className="primary-button" type="submit">
          Enregistrer la machine
        </button>
      </div>
    </form>
  );
}

export default MachineForm;
