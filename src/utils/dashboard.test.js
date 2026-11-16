import { getMachineStats } from './dashboard';

test('calculates machine counts and production from the current list', () => {
  const machines = [
    { status: 'En fonctionnement', dailyProduction: 10 },
    { status: "À l'arrêt", dailyProduction: 0 },
    { status: 'En panne', dailyProduction: 5 },
  ];

  expect(getMachineStats(machines)).toEqual({
    total: 3,
    running: 1,
    stopped: 1,
    broken: 1,
    totalProduction: 15,
  });
});
