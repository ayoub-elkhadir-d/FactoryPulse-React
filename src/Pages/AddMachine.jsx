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
        <MachineForm
          errors={errors}
          form={form}
          onChange={updateField}
          onSubmit={handleSubmit}
        />
      </section>
    </>
  );
}

export default AddMachine;
