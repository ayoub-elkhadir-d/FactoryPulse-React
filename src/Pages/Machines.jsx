import { useMemo, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import MachineTable from '../Components/Machines/MachineTable';
import SearchBar from '../Components/Machines/SearchBar';
import StatusFilter from '../Components/Machines/StatusFilter';

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
        <SearchBar onChange={setSearch} value={search} />
        <StatusFilter onChange={setStatusFilter} value={statusFilter} />
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
