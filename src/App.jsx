import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import AddMachine from './Pages/AddMachine';
import Machines from './Pages/Machines';
import MainLayout from './Components/Layouts/MainLayout';
import './App.css';

function App() {
  const [machines, setMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMachines() {
      try {
        const response = await fetch('/machines.json', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('The machines file must contain a list.');
        }

        setMachines(data);
        setLoadError('');
      } catch {
        if (!controller.signal.aborted) {
          setLoadError('Les machines n’ont pas pu être chargées. Réessayez.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    setIsLoading(true);
    loadMachines();

    return () => controller.abort();
  }, [reloadCount]);

  function addMachine(machine) {
    setMachines((currentMachines) => [...currentMachines, machine]);
  }

  function updateMachineStatus(machineId, status) {
    setMachines((currentMachines) =>
      currentMachines.map((machine) =>
        machine.id === machineId ? { ...machine, status } : machine
      )
    );
  }

  function deleteMachine(machineId) {
    setMachines((currentMachines) =>
      currentMachines.filter((machine) => machine.id !== machineId)
    );
  }

  function retryLoading() {
    setLoadError('');
    setIsLoading(true);
    setReloadCount((count) => count + 1);
  }

  const pageData = {
    machines,
    addMachine,
    updateMachineStatus,
    deleteMachine,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <MainLayout
              isLoading={isLoading}
              loadError={loadError}
              onRetry={retryLoading}
              pageData={pageData}
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="machines" element={<Machines />} />
          <Route path="machines/new" element={<AddMachine />} />
          <Route path="*" element={<p>Cette page n’existe pas.</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
