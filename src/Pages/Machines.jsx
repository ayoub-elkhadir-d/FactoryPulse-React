import { useMemo, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import MachineTable from '../Components/Machines/MachineTable';
import { MACHINE_STATUSES } from '../constants/machines';

function Machines() {
  const { machines, updateMachineStatus, deleteMachine } = useOutletContext();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredMachines = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('fr');

    return machines.filter((machine) => {
      const matchesSearch =
        machine.name.toLocaleLowerCase('fr').includes(normalizedSearch) ||
        machine.id.toLocaleLowerCase('fr').includes(normalizedSearch);
      const matchesStatus = !statusFilter || machine.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [machines, search, statusFilter]);

  function resetFilters() {
    setSearch('');
    setStatusFilter('');
  }

  return (
    <>
      <section className="page-heading">
        <div>
          <h1>Machines</h1>
          <p>Consultez et mettez à jour les équipements de production.</p>
        </div>
        <Link className="primary-button" to="/machines/new">
          <span aria-hidden="true">+</span> Ajouter une machine
        </Link>
      </section>

      <section aria-label="Rechercher et filtrer les machines" className="panel filters-panel">
        <label className="search-field">
          <span aria-hidden="true">⌕</span>
          <input
            aria-label="Rechercher une machine"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher par nom ou identifiant"
            type="search"
            value={search}
          />
        </label>
        <label>
          <span className="sr-only">Filtrer par statut</span>
          <select
            aria-label="Filtrer par statut"
            className="filter-select"
            onChange={(event) => setStatusFilter(event.target.value)}
            value={statusFilter}
          >
            <option value="">Tous les statuts</option>
            {MACHINE_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        {(search || statusFilter) && (
          <button className="secondary-button" onClick={resetFilters} type="button">
            Réinitialiser
          </button>
        )}
      </section>

      <section aria-labelledby="machines-list-title" className="panel">
        <div className="panel-heading">
          <div>
            <h2 id="machines-list-title">Toutes les machines</h2>
            <p>{filteredMachines.length} machine(s) affichée(s)</p>
          </div>
        </div>
        <MachineTable
          machines={filteredMachines}
          onDelete={deleteMachine}
          onStatusChange={updateMachineStatus}
        />
      </section>
    </>
  );
}

export default Machines;
