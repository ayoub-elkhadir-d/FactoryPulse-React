import { createMachineId, validateMachine } from './machines';

const validMachine = {
  name: 'Presse hydraulique',
  zone: 'Atelier A',
  status: 'En fonctionnement',
  dailyProduction: '0',
};

test('accepts a complete machine with zero daily production', () => {
  expect(validateMachine(validMachine)).toEqual({});
});

test.each(['', '-1', '1.5', 'texte'])(
  'rejects an invalid daily production value: %s',
  (dailyProduction) => {
    expect(
      validateMachine({ ...validMachine, dailyProduction })
    ).toHaveProperty('dailyProduction');
  }
);

test('reports missing fields and an invalid status', () => {
  expect(
    validateMachine({
      name: ' ',
      zone: '',
      status: 'Maintenance',
      dailyProduction: '12',
    })
  ).toEqual({
    name: 'Le nom de la machine est obligatoire.',
    zone: 'La zone de production est obligatoire.',
    status: 'Sélectionnez un statut valide.',
  });
});

test('creates an identifier that does not repeat an existing identifier', () => {
  const existingId = createMachineId([]);
  const nextId = createMachineId([{ id: existingId }]);

  expect(nextId).not.toBe(existingId);
});
