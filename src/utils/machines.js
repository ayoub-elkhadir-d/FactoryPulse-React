import { MACHINE_STATUSES } from '../constants/machines';

export function getStatusClass(status) {
  if (status === 'En fonctionnement') {
    return 'running';
  }

  if (status === "À l'arrêt") {
    return 'stopped';
  }

  return 'broken';
}

export function createMachineId(machines) {
  let id;

  do {
    const timePart = Date.now().toString(36);
    const randomPart = Math.random().toString(36).slice(2, 10);
    id = `machine-${timePart}-${randomPart}`;
  } while (machines.some((machine) => machine.id === id));

  return id;
}

export function validateMachine(machine) {
  const errors = {};

  if (typeof machine.name !== 'string' || !machine.name.trim()) {
    errors.name = 'Le nom de la machine est obligatoire.';
  }

  if (typeof machine.zone !== 'string' || !machine.zone.trim()) {
    errors.zone = 'La zone de production est obligatoire.';
  }

  const productionText = String(machine.dailyProduction ?? '').trim();
  const production = Number(productionText);

  if (
    productionText === '' ||
    !Number.isInteger(production) ||
    production < 0
  ) {
    errors.dailyProduction =
      'La production doit être un nombre entier supérieur ou égal à zéro.';
  }

  if (!MACHINE_STATUSES.includes(machine.status)) {
    errors.status = 'Sélectionnez un statut valide.';
  }

  return errors;
}
