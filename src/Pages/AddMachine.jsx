import { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { MACHINE_STATUSES } from '../constants/machines';
import { createMachineId, validateMachine } from '../utils/machines';
import MachineForm from '../Components/Machines/MachineForm';

const emptyForm = {
  name: '',
  zone: '',
  status: MACHINE_STATUSES[0],
  dailyProduction: '',
};

function AddMachine() {
  const { machines, addMachine } = useOutletContext();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateMachine(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    addMachine({
      id: createMachineId(machines),
      name: form.name.trim(),
      zone: form.zone.trim(),
      status: form.status,
      dailyProduction: Number(form.dailyProduction),
    });
    navigate('/machines');
  }

  return (
    <>
      <section className="page-heading">
        <div>
          <h1>Ajouter une machine</h1>
          <p>Renseignez les informations du nouvel équipement.</p>
        </div>
        <Link className="secondary-button" to="/machines">
          Retour aux machines
        </Link>
      </section>

      <section aria-label="Informations de la machine" className="panel form-panel">
        <form className="machine-form" noValidate onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="machine-name">Nom de la machine</label>
            <input
              aria-describedby={errors.name ? 'machine-name-error' : undefined}
              aria-invalid={Boolean(errors.name)}
              id="machine-name"
              name="name"
              onChange={updateField}
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
              onChange={updateField}
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
              onChange={updateField}
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
              onChange={updateField}
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
      </section>
    </>
  );
}

export default AddMachine;
