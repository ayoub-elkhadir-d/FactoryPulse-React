import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from './App.jsx';

const sampleMachines = [
  {
    id: 'machine-101',
    name: 'Presse hydraulique',
    zone: 'Atelier A',
    status: 'En fonctionnement',
    dailyProduction: 120,
  },
  {
    id: 'machine-102',
    name: 'Convoyeur',
    zone: 'Atelier B',
    status: "À l'arrêt",
    dailyProduction: 80,
  },
];

function mockMachineResponse(machines = sampleMachines) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => machines,
  });
}

beforeEach(() => {
  window.history.replaceState({}, '', '/');
  mockMachineResponse();
  window.confirm = jest.fn(() => true);
});

afterEach(() => {
  delete global.fetch;
});

test('loads the initial machines and calculates the dashboard indicators', async () => {
  render(<App />);

  expect(
    await screen.findByRole('heading', { name: 'Tableau de bord' })
  ).toBeInTheDocument();
  expect(
    within(screen.getByText('Total des machines').parentElement).getByText('2')
  ).toBeInTheDocument();
  expect(
    within(
      screen.getByText('En fonctionnement', { selector: '.stat-label' }).parentElement
    ).getByText('1')
  ).toBeInTheDocument();
  expect(
    within(
      screen.getByText("À l'arrêt", { selector: '.stat-label' }).parentElement
    ).getByText('1')
  ).toBeInTheDocument();
});

test('filters machines and lets the user reset the filters', async () => {
  render(<App />);
  await screen.findByRole('heading', { name: 'Tableau de bord' });
  fireEvent.click(screen.getByRole('link', { name: 'Machines' }));

  fireEvent.change(screen.getByLabelText('Filtrer par statut'), {
    target: { value: "À l'arrêt" },
  });
  expect(screen.getByText('Convoyeur')).toBeInTheDocument();
  expect(screen.queryByText('Presse hydraulique')).not.toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Rechercher une machine'), {
    target: { value: 'absente' },
  });
  expect(
    screen.getByText('Aucune machine ne correspond à votre recherche.')
  ).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Réinitialiser' }));
  expect(screen.getByText('Presse hydraulique')).toBeInTheDocument();
  expect(screen.getByText('Convoyeur')).toBeInTheDocument();
});

test('validates a new machine and adds it to the shared list', async () => {
  render(<App />);
  await screen.findByRole('heading', { name: 'Tableau de bord' });
  fireEvent.click(screen.getByRole('link', { name: 'Machines' }));
  fireEvent.click(screen.getByRole('link', { name: /Ajouter une machine/ }));

  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer la machine' }));
  expect(
    screen.getByText('Le nom de la machine est obligatoire.')
  ).toBeInTheDocument();
  expect(
    screen.getByText('La zone de production est obligatoire.')
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      'La production doit être un nombre entier supérieur ou égal à zéro.'
    )
  ).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Nom de la machine'), {
    target: { value: 'Presse de test' },
  });
  fireEvent.change(screen.getByLabelText('Zone de production'), {
    target: { value: 'Atelier C' },
  });
  fireEvent.change(screen.getByLabelText('Production journalière (pièces)'), {
    target: { value: '1.5' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer la machine' }));
  expect(
    screen.getByText(
      'La production doit être un nombre entier supérieur ou égal à zéro.'
    )
  ).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Production journalière (pièces)'), {
    target: { value: '-1' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer la machine' }));
  expect(
    screen.getByText(
      'La production doit être un nombre entier supérieur ou égal à zéro.'
    )
  ).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Production journalière (pièces)'), {
    target: { value: '50' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer la machine' }));

  expect(await screen.findByText('Presse de test')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Tableau de bord' }));
  await waitFor(() => {
    expect(
      within(screen.getByText('Total des machines').parentElement).getByText('3')
    ).toBeInTheDocument();
  });
});

test('updates a status and only removes a machine after confirmation', async () => {
  render(<App />);
  await screen.findByRole('heading', { name: 'Tableau de bord' });
  fireEvent.click(screen.getByRole('link', { name: 'Machines' }));

  fireEvent.change(screen.getByLabelText('Statut de Presse hydraulique'), {
    target: { value: 'En panne' },
  });
  window.confirm.mockReturnValueOnce(false);
  fireEvent.click(screen.getByRole('button', { name: 'Supprimer Convoyeur' }));
  expect(screen.getByText('Convoyeur')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Supprimer Convoyeur' }));
  expect(window.confirm).toHaveBeenCalledTimes(2);
  expect(screen.queryByText('Convoyeur')).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('link', { name: 'Tableau de bord' }));
  await waitFor(() => {
    expect(
      within(screen.getByText('Total des machines').parentElement).getByText('1')
    ).toBeInTheDocument();
  });
  expect(
    within(screen.getByText('En panne', { selector: '.stat-label' }).parentElement)
      .getByText('1')
  ).toBeInTheDocument();
});

test('shows a loading error and retries the local data request', async () => {
  global.fetch
    .mockResolvedValueOnce({ ok: false, status: 500 })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => sampleMachines,
    });

  render(<App />);

  expect(
    await screen.findByText('Les machines n’ont pas pu être chargées. Réessayez.')
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Réessayer' }));
  expect(
    await screen.findByRole('heading', { name: 'Tableau de bord' })
  ).toBeInTheDocument();
});
