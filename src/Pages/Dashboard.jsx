import { Link, useOutletContext } from 'react-router-dom';
import MachineTable from '../Components/Machines/MachineTable';

function Dashboard() {
  const { machines } = useOutletContext();
  const runningCount = machines.filter(
    (machine) => machine.status === 'En fonctionnement'
  ).length;
  const stoppedCount = machines.filter(
    (machine) => machine.status === "À l'arrêt"
  ).length;
  const brokenCount = machines.filter(
    (machine) => machine.status === 'En panne'
  ).length;
  const totalProduction = machines.reduce(
    (total, machine) => total + machine.dailyProduction,
    0
  );

  const chartMachines = [...machines]
    .sort((first, second) => second.dailyProduction - first.dailyProduction)
    .slice(0, 7);
  const maximumProduction = Math.max(
    ...chartMachines.map((machine) => machine.dailyProduction),
    0
  );

  return (
    <>
      <section className="page-heading">
        <div>
          <h1>Tableau de bord</h1>
          <p>Un aperçu rapide de vos machines et de la production du jour.</p>
        </div>
      </section>

      <section aria-label="Indicateurs des machines" className="stats-grid">
        <article className="stat-card">
          <span className="stat-label">Total des machines</span>
          <strong className="stat-value">{machines.length}</strong>
          <span className="stat-note">Machines enregistrées</span>
        </article>
        <article className="stat-card running">
          <span className="stat-label">En fonctionnement</span>
          <strong className="stat-value">{runningCount}</strong>
          <span className="stat-note">Machines actives</span>
        </article>
        <article className="stat-card stopped">
          <span className="stat-label">À l'arrêt</span>
          <strong className="stat-value">{stoppedCount}</strong>
          <span className="stat-note">Machines arrêtées</span>
        </article>
        <article className="stat-card broken">
          <span className="stat-label">En panne</span>
          <strong className="stat-value">{brokenCount}</strong>
          <span className="stat-note">Machines à vérifier</span>
        </article>
      </section>

      <section aria-labelledby="production-title" className="panel">
        <div className="panel-heading">
          <div>
            <h2 id="production-title">Production par machine</h2>
            <p>
              {totalProduction.toLocaleString('fr-FR')} pièces produites aujourd’hui
            </p>
          </div>
        </div>
        {chartMachines.length === 0 ? (
          <p className="empty-state">Aucune donnée de production disponible.</p>
        ) : (
          <div aria-label="Production journalière des machines" className="production-chart">
            {chartMachines.map((machine, index) => {
              const height =
                maximumProduction === 0
                  ? 0
                  : Math.max(8, (machine.dailyProduction / maximumProduction) * 100);

              return (
                <div className="chart-column" key={machine.id}>
                  <div className="chart-bar-track">
                    <span
                      aria-label={`${machine.dailyProduction} pièces`}
                      className={`chart-bar ${index === 0 ? 'top' : ''}`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="chart-label" title={machine.name}>
                    {machine.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section aria-labelledby="recent-machines-title" className="panel">
        <div className="panel-heading">
          <div>
            <h2 id="recent-machines-title">Machines</h2>
            <p>État et production de vos équipements.</p>
          </div>
          <Link className="text-link" to="/machines">
            Voir toutes les machines →
          </Link>
        </div>
        <MachineTable compact machines={machines.slice(0, 4)} />
      </section>
    </>
  );
}

export default Dashboard;
