export function getMachineStats(machines) {
  return machines.reduce(
    (stats, machine) => {
      stats.totalProduction += machine.dailyProduction;

      if (machine.status === 'En fonctionnement') {
        stats.running += 1;
      } else if (machine.status === "À l'arrêt") {
        stats.stopped += 1;
      } else if (machine.status === 'En panne') {
        stats.broken += 1;
      }

      return stats;
    },
    {
      total: machines.length,
      running: 0,
      stopped: 0,
      broken: 0,
      totalProduction: 0,
    }
  );
}
